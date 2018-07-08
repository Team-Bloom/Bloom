import React, { Component } from 'react';
import { NodeObjectTmpl } from './';
import './node.css';

class NodeObject extends Component {
  constructor(props) {
    super(props);
    this.textEdit = React.createRef();
    this.state = {
      isEdit: false,
    };
  }

  componentDidMount = () => {
      console.log(this.textEdit)
      //this.textEdit.current.focus()
  }

  toggleEdit = async () => {
    if (this.props.shouldEdit) {
      await this.setState({
        isEdit: !this.state.isEdit,
      });
      if(this.state.isEdit){
          this.textEdit.current.focus()
      }
      this.props.checkState();
    } else {
      this.props.makeEditable();
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
        pasteOption={this.props.pasteOption}
        node={this.props.node}
        collapse={this.props.collapse}
        textEdit={this.textEdit}
      />
    );
  }
}

export default NodeObject;
