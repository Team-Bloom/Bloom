import React, { Component } from 'react'

class Node extends Component {
    constructor(props) {
      super(props)

      this.state = {
          text: 'Node Name',
          isEdit: false
      }
    }

    handleChange = (ev) => {
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value
        })
    }

    toggleEdit = () => {
        this.setState({
            ...this.state,
            isEdit: !this.state.isEdit
        })
    }
  render() {
    return (
      <div className="nodeWrap">
        <div className="node" onClick={this.toggleEdit}>
            {this.state.isEdit ? (<input type="text" name="text" value={this.state.text} onChange={this.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.state.text}</span>)}
            <svg className="nodeIcon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
	           <title id="title">Umbrella Icon</title>
               <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
           </svg>
        </div>
      </div>
    );
  }
}

export default Node
