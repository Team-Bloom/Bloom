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
        pasteOption={this.props.pasteOption}
        toggleEdit={this.toggleEdit}
        text={this.props.text}
        handleChange={this.props.handleChange}
        addNode={this.props.addNode}
        pasteNode={this.props.pasteNode}
        deleteNode={this.deleteNode}
        point={this.props.point}
        cutNode={this.cutNode}
        currentCut={this.props.currentCut}
        isEdit={this.state.isEdit}
        pointed={this.props.pointed}
        collapse={this.props.collapse}
      />
    );
  }
}

export default NodeObject;
