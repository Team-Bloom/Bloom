import React, { Component } from 'react'

class Node extends Component {
    constructor(props) {
      super(props)

      this.state = {
          text: 'Node Name',
          isEdit: false,
          pos1: 0,
          pos2: 0,
          pos3: 0,
          pos4: 0
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

    drag = (ev) => {
        this.setState({
            ...this.state,
            pos1: this.state.pos3 - ev.clientX,
            pos2: this.state.pos4 - ev.clientY,
            pos3: ev.clientX,
            pos4: ev.clientY,
        })
        ev.target.parentNode.style.top = (ev.target.parentNode.offsetTop - this.state.pos2) + "px"
        ev.target.parentNode.style.left = (ev.target.parentNode.offsetLeft - this.state.pos1) + "px"
    }

    startDrag = (ev) => {
        this.setState({
            ...this.state,
            pos3: ev.clientX,
            pos4: ev.clientY,
        })
        ev.target.onmousemove = this.drag
    }

    stopDrag = (ev) => {
        //stop drag and drag need to be about the mouse event anywhere, making it based on the event target isn't reliable
        //allows you to move quicker than the browser's response and get off the object but leave the event live
        ev.target.onmousemove = null
    }


  render() {
    return (
        <div className="nodeWrap">
            <div className="dragger" onMouseDown={this.startDrag} onMouseUp={this.stopDrag}>
          <div className="node" onClick={this.toggleEdit}>
              {this.state.isEdit ? (<input type="text" name="text" value={this.state.text} onChange={this.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.state.text}</span>)}
              <svg className="nodeIcon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
  	           <title id="title">Umbrella Icon</title>
                 <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
             </svg>
          </div>
          <div className="nodeWrap test">
          <div className="dragger">
          <svg className="connection" height="210" width="500">
            <line x1="75" y1="-20" x2="75" y2="0" style={{stroke:'rgb(0,0,0)',strokeWidth:'0.05em'}} />
          </svg>
            <div className="node" onClick={this.toggleEdit}>
                {this.state.isEdit ? (<input type="text" name="text" value={this.state.text} onChange={this.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.state.text}</span>)}
                <svg className="nodeIcon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
    	           <title id="title">Umbrella Icon</title>
                   <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
               </svg>
            </div>
            </div>
          </div>
          <div className="nodeWrap test">
          <div className="dragger">
          <svg className="connection" height="210" width="500">
            <line x1="75" y1="-20" x2="75" y2="0" style={{stroke:'rgb(0,0,0)',strokeWidth:'0.05em'}} />
          </svg>
            <div className="node" onClick={this.toggleEdit}>
                {this.state.isEdit ? (<input type="text" name="text" value={this.state.text} onChange={this.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.state.text}</span>)}
                <svg className="nodeIcon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
                  <title id="title">Umbrella Icon</title>
                   <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
               </svg>
            </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}

export default Node
