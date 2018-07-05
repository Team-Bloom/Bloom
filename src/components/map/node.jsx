import React, { Component } from 'react';
import './node.css';
import { NodeTmpl } from './';
import { makeHashCode, makeDraggable } from '../../utilities/';

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
      count: this.props.count || 0,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.count !== state.count) {
      return {
        node: props.node,
        count: props.count,
      };
    }
    return null;
  };

  handleChange = ev => {
    this.setState({
      node: {
        ...this.state.node,
        text: ev.target.value,
      },
    });
  };

  point = async ev => {
      //set flag to make node look like a pointed card
      ev.stopPropagation();
      await this.setState({
          node: {
              ...this.state.node,
              pointed: !this.state.node.pointed,
          }
      })
      this.checkState()
  }

  collapse = async ev => {
      ev.stopPropagation();
      console.log("running")
      await this.setState({
          node: {
              ...this.state.node,
              collapsed: !this.state.node.collapsed,
          }
      })
      this.checkState()
  }

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
        children: [...this.state.node.children, newNode],
      },
    });
    this.checkState();
  };

  pasteNode = async ev => {
    ev.stopPropagation();
    await this.setState({
      ...this.state,
      node: {
        ...this.state.node,
        children: [...this.state.node.children, this.props.pasteOption],
      },
    });
    await this.props.clearPaste();
    this.checkState();
  };

  deleteNode = id => {
    this.props.checkState({ delete: true, id: id });
  };

  cutNode = id => {
    this.props.checkState({ cut: true, id: id });
  };

  checkState = async childState => {
    //this will need to recursively bubble up the state
    if (childState) {
      for (let i = 0; i < this.state.node.children.length; i++) {
        if (this.state.node.children[i].id === childState.id) {
          const childrenBefore = this.state.node.children.slice(0, i);
          const childrenAfter = this.state.node.children[i + 1]
            ? this.state.node.children.slice(i + 1)
            : [];
          if (childState.delete) {
            //delete child that matches
            await this.setState({
              node: {
                ...this.state.node,
                children: [...childrenBefore, ...childrenAfter],
              },
            });
          } else if (childState.cut) {
            //cut child that matches
            const arrayCopy = this.state.node.children.slice();
            const cutOut = arrayCopy.splice(i, 1)[0];
            await this.setState({
              node: {
                ...this.state.node,
                children: arrayCopy,
              },
            });
            this.props.currentCut(cutOut);
          } else {
            //update child that matches
            await this.setState({
              node: {
                ...this.state.node,
                children: [...childrenBefore, childState, ...childrenAfter],
              },
            });
          }
        }
      }
    }
    this.props.checkState(this.state.node);
  };

  render() {
    return (
      <NodeTmpl
        node={this.state.node}
        dragger={this.dragger}
        func={ev => {
          makeDraggable(ev, this);
        }}
        addNode={this.addNode}
        handleChange={this.handleChange}
        checkState={this.checkState}
        deleteNode={this.deleteNode}
        point={this.point}
        count={this.props.count}
        currentCut={this.props.currentCut}
        pasteOption={this.props.pasteOption}
        cutNode={this.cutNode}
        pasteNode={this.pasteNode}
        clearPaste={this.props.clearPaste}
        collapse={this.collapse}
      />
    );
  }
}

export default Node;
