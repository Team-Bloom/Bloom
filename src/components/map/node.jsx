import React, { Component } from 'react';
import './node.css';
import { NodeObject } from './';
import { db } from './';
import {makeHashCode, makeDraggable} from '../../utilities/';

class Node extends Component {
  constructor(props) {
    super(props);
    this.dragger = React.createRef();
    this.state = {
      isEdit: false,
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      shouldEdit: true,
      node: this.props.node || {},
      count: this.props.count || 0
    };
  }

  static getDerivedStateFromProps = (props, state) => {
      if(props.count !== state.count){
          return {
              node: props.node,
              count: props.count
          }
      }
  }

  handleChange = ev => {
    this.setState({node: {
        ...this.state.node,
        text: ev.target.value
    }})
  };

  addNode = async ev => {
    ev.stopPropagation();
    const newNode = {
      left: '200',
      top: `${this.state.node.children.length * 100 - 100}`,
      id: makeHashCode(),
      text: 'Nodename',
      children: [],
    };
    await this.setState({
      ...this.state,
      node: {
          ...this.state.node,
          children: [...this.state.node.children, newNode]
      },
    });
    this.checkState();
  };

  deleteNode = id => {
    this.props.checkState({delete: true, id: id});
  };

  checkState = childState => {
    //this will need to recursively bubble up the state
    if (childState) {
      for (let i = 0; i < this.state.node.children.length; i++) {
        if (this.state.node.children[i].id === childState.id) {
          if(childState.delete){
              const childrenBefore = this.state.node.children.slice(0, i)
              const childrenAfter = this.state.node.children[i + 1] ? this.state.node.children.slice(i + 1) : []
              this.state.node.children = [...childrenBefore, ...childrenAfter]
          } else {
              //TODO: change this to not mutate data and use the setState method
              this.state.node.children[i] = childState
          }
        }
      }
    }
    this.props.checkState(this.state.node);
  };

  render() {
    return (
      <div className="nodeWrap">
        <svg
          className="line"
          height={Math.abs(this.state.node.top) + 2 + 'px'}
          width={Math.abs(this.state.node.left) + 2 + 'px'}
        >
          <line
            x1="0"
            y1="0"
            x2={this.state.node.left + 'px'}
            y2={this.state.node.top + 'px'}
            style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }}
          />
        </svg>
        <div
          className="dragger"
          onMouseDown={(ev) => {makeDraggable(ev, this)}}
          ref={this.dragger}
          style={{ left: this.state.node.left + 'px', top: this.state.node.top + 'px' }}
        >
          <NodeObject
            addNode={this.addNode}
            handleChange={this.handleChange}
            text={this.state.node && this.state.node.text}
            checkState={this.checkState}
            deleteNode={this.deleteNode}
            id={this.state.node && this.state.node.id}
          />
          {this.state &&
            this.state.node &&
            this.state.node.children &&
            this.state.node.children.map(node => {
              return (
                <Node
                  checkState={this.checkState}
                  deleteNode={this.deleteNode}
                  node={node}
                  count={this.props.count}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Node;
