import React, { Component } from 'react'
import './node.css'

class NodeObject extends Component {
    constructor(props) {
      super(props)
      this.state = {
          isEdit: false,
      }
    }

    toggleEdit = () => {
        if(this.state.shouldEdit){
            this.setState({
                ...this.state,
                isEdit: !this.state.isEdit
            })
            console.log('from edit')
            this.props.checkState()
        } else {
            this.setState({shouldEdit: true})
        }
    }


  render() {
    return (
        <div className="node" onClick={this.toggleEdit}>
            {this.state.isEdit ? (<input type="text" name="text" value={this.props.text} onChange={this.props.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.props.text}</span>)}
            <svg className="nodeIcon" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
                <title id="title">{this.props.text}</title>
                <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
            </svg>
            <button onClick={this.props.addNode}>Add </button>
        </div>
    )
  }
}

export default NodeObject
