import React, { Component } from 'react';
import { NodeObjectTmpl } from './';
import './node.css';

class NodeObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  toggleEdit = () => {
    if (this.state.shouldEdit) {
      this.setState({
        isEdit: !this.state.isEdit,
      });
      this.props.checkState();
    } else {
      this.setState({ shouldEdit: true });
    }
  };

  deleteNode = ev => {
    ev.stopPropagation();
    this.props.deleteNode(this.props.id);
  };

  cutNode = ev => {
    ev.stopPropagation();
    this.props.cutNode(this.props.id);
  };

  render() {
    return (
      <NodeObjectTmpl
        toggleEdit={this.toggleEdit}
        text={this.props.text}
        handleChange={this.props.handleChange}
        addNode={this.props.addNode}
        pasteNode={this.props.pasteNode}
        deleteNode={this.deleteNode}
        cutNode={this.cutNode}
        currentCut={this.props.currentCut}
        isEdit={this.state.isEdit}
      />
    );
  }
}

export default NodeObject;
