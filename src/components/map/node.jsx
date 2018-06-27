import React, { Component } from 'react';
import './node.css';
import { NodeObject } from './';
import { db } from './';
import hashCode from '../../utilities/hash';

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
      node: this.props.node || {}
    };
  }

  // static getDerivedStateFromProps = (props, state) => {
  //     console.log('checking')
  //     if(props.node && props.node.text !== state.node.text){
  //         console.log('gotime', props.node, state.node)
  //         return {
  //             node: {
  //                 ...state.node
  //             }
  //         }
  //     }
  //     console.log("RUNNING NEW", props, state)
  //     //this.setState({node: props.node})
  //     return {
  //         //...props
  //     }
  //}

  componentWillReceiveProps = (nextProps, prevProps) => {
      if(!prevProps || !prevProps.node || nextProps.node.text !== prevProps.node.text || nextProps.node.left === prevProps.node.left || nextProps.node.top === prevProps.node.top ){
          this.setState({node: nextProps.node})
      }

  }

  handleChange = ev => {
      console.log('running')
    this.setState({node: {
        ...this.state.node,
        text: ev.target.value
    }})
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
      node: {
          ...this.state.node,
          top: this.dragger.current.offsetTop - this.state.pos2,
          left: this.dragger.current.offsetLeft - this.state.pos1,
      },
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
    if(!this.state.shouldEdit){
        this.checkState();
    }
  };

  addNode = async ev => {
    ev.stopPropagation();
    const newNode = {
      left: '200',
      top: `${this.state.node.children.length * 100 - 100}`,
      id: hashCode(),
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
              // console.log('in here')
              const childrenBefore = this.state.node.children.slice(0, i)
              const childrenAfter = this.state.node.children[i + 1] ? this.state.node.children.slice(i + 1) : []
              this.state.node.children = [...childrenBefore, ...childrenAfter]
          } else {
              //TODO: change this to not mutate data and use the setState method
              this.state.node.children[i] = childState
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
          onMouseDown={this.startDrag}
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
          {this.props &&
            this.props.node &&
            this.props.node.children &&
            this.props.node.children.map(node => {
              return (
                <Node
                  checkState={this.checkState}
                  deleteNode={this.deleteNode}
                  node={node}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Node;
