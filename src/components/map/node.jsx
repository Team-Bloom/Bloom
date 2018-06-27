import React, { Component } from 'react';
import './node.css';
import { NodeObject } from './';
import { db } from './';
import hashCode from '../../utilities/hash';

class Node extends Component {
  constructor(props) {
      console.log('IM CONSTRUCTING')
    super(props);
    this.dragger = React.createRef();
    this.state = {
      text: this.props.text || 'Node Name',
      id: this.props.id || 'root',
      isEdit: false,
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      left: this.props.left || '50',
      top: this.props.top || '50',
      children: this.props.children || [],
      shouldEdit: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { left, top, text, children } = nextProps;
    this.setState({
      left,
      top,
      text,
      children,
    });
  }

  handleChange = ev => {
    this.setState({
      ...this.state,
      [ev.target.name]: ev.target.value,
    });
  };

  drag = ev => {
    //the should edit for child nodes is being attached to the root node
    ev.stopPropagation();
    this.setState({
      ...this.state,
      pos1: this.state.pos3 - ev.clientX,
      pos2: this.state.pos4 - ev.clientY,
      pos3: ev.clientX,
      pos4: ev.clientY,
      top: this.dragger.current.offsetTop - this.state.pos2,
      left: this.dragger.current.offsetLeft - this.state.pos1,
      shouldEdit: false,
    });
  };

  startDrag = ev => {
    ev.stopPropagation();
    this.setState({
      ...this.state,
      pos3: ev.clientX,
      pos4: ev.clientY,
    });
    document.onmousemove = this.drag;
    document.onmouseup = this.stopDrag;
  };

  stopDrag = ev => {
    ev.stopPropagation();
    document.onmousemove = null;
    this.checkState();
  };

  addNode = async ev => {
    ev.stopPropagation();
    const newNode = {
      left: '200',
      top: `${this.state.children.length * 100 - 100}`,
      id: hashCode(),
      text: 'Nodename',
      children: [],
    };
    await this.setState({
      ...this.state,
      children: [...this.state.children, newNode],
    });
    this.checkState();
  };

  deleteNode = id => {
    console.log("running delete from node")
    this.props.checkState({delete: true, id: id});
  };

  checkState = childState => {
    //this will need to recursively bubble up the state
    console.log("childstated", childState)
    if (childState) {
      for (let i = 0; i < this.state.children.length; i++) {
        if (this.state.children[i].id === childState.id) {
          if(childState.delete){
              // console.log('in here')
              const childrenBefore = this.state.children.slice(0, i)
              const childrenAfter = this.state.children[i + 1] ? this.state.children.slice(i + 1) : []
              this.state.children = [...childrenBefore, ...childrenAfter]
          } else {
              //TODO: change this to not mutate data and use the setState method
              this.state.children[i] = childState
          }
        }
      }
      // if (childState && childState.children && childState.children.length > 0) {
      //   for (let i = 0; i < this.state.children.length; i++) {
      //     //compare children names or maybe react ids
      //     //names aren't yet on the children state
      //     //need to be added and then checked
      //     //id will be fine,
      //     //every add will have to instantly bubble up
      //     //and then the api will respond with entire json object
      //     //then maybe we compare or maybe we just refill out form
      //     //probably depends on speed test
      //   }
      // }
    }
    this.props.checkState(this.state);
  };

  render() {
    return (
      <div className="nodeWrap">
        <svg
          className="line"
          height={Math.abs(this.state.top) + 2 + 'px'}
          width={Math.abs(this.state.left) + 2 + 'px'}
        >
          <line
            x1="0"
            y1="0"
            x2={this.state.left + 'px'}
            y2={this.state.top + 'px'}
            style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }}
          />
        </svg>
        <div
          className="dragger"
          onMouseDown={this.startDrag}
          ref={this.dragger}
          style={{ left: this.state.left + 'px', top: this.state.top + 'px' }}
        >
          <NodeObject
            addNode={this.addNode}
            handleChange={this.handleChange}
            text={this.state.text}
            checkState={this.checkState}
            deleteNode={this.deleteNode}
            id={this.props.id}
          />
          {this.props &&
            this.props.children &&
            this.props.children.map(node => {
              return (
                <Node
                  key={node.id}
                  left={node.left}
                  top={node.top}
                  text={node.text}
                  children={node.children}
                  id={node.id}
                  checkState={this.checkState}
                  deleteNode={this.deleteNode}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Node;
