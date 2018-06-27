import React, { Component } from 'react';
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

  deleteNode = (ev) => {
      ev.stopPropagation()
      this.props.deleteNode(this.props.id)
  }

  render() {
    return (
      <div className="node" onClick={this.toggleEdit}>
        {this.state.isEdit ? (
          <input
            type="text"
            name="text"
            value={this.props.text}
            onChange={this.props.handleChange}
            onClick={ev => {
              ev.stopPropagation();
            }}
          />
        ) : (
          <span>{this.props.text}</span>
        )}
        <svg
          className="nodeIcon"
          width="100%"
          viewBox="0 0 32 32"
          aria-labelledby="title"
        >
          <title id="title">{this.props.text}</title>
          <rect
            width="100%"
            height="50%"
            style={{
              fill: 'rgb(255,255,255)',
              strokeWidth: '0.01em',
              stroke: 'rgb(0,0,0)',
            }}
          />
        </svg>
        <button onClick={this.props.addNode}>Add </button>
        <button onClick={this.deleteNode}>Delete </button>
      </div>
    );
  }
}

export default NodeObject;
