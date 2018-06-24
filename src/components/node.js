import React, { Component } from 'react'
import './node.css'
import {Node as RecNode} from './'

class Node extends Component {
    constructor(props) {
      super(props)
      this.dragger = React.createRef()
      this.state = {
          text: 'Node Name',
          isEdit: false,
          pos1: 0,
          pos2: 0,
          pos3: 0,
          pos4: 0,
          left: this.props.left || '50px',
          top: this.props.top || '50px',
          children: [],
          shouldEdit: true
      }
    }

    handleChange = (ev) => {
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value
        })
    }

    toggleEdit = () => {
        if(this.state.shouldEdit){
            this.setState({
                ...this.state,
                isEdit: !this.state.isEdit
            })
        } else {
            this.setState({shouldEdit: true})
        }
    }

    drag = (ev) => {
        //the should edit for child nodes is being attached to the root node
        ev.stopPropagation()
        this.setState({
            ...this.state,
            pos1: this.state.pos3 - ev.clientX,
            pos2: this.state.pos4 - ev.clientY,
            pos3: ev.clientX,
            pos4: ev.clientY,
            top: (this.dragger.current.offsetTop - this.state.pos2) + "px",
            left: (this.dragger.current.offsetLeft - this.state.pos1) + "px",
            shouldEdit: false,
        })
    }

    startDrag = (ev) => {
        ev.stopPropagation()
        this.setState({
            ...this.state,
            pos3: ev.clientX,
            pos4: ev.clientY,
        })
        //this is why the mousemove is needing to be to its parents
        document.onmousemove = this.drag
        document.onmouseup = this.stopDrag
    }

    stopDrag = (ev) => {
        ev.stopPropagation()
        document.onmousemove = null
    }

    addNode = (ev) => {
        ev.stopPropagation()
        this.setState({
            ...this.state,
            children: [...this.state.children, {left: '200px', top: `${this.state.children.length * 100 - 100}px`}]
        })
    }


  render() {
    return (
        <div className="nodeWrap">
            <div className="dragger" onMouseDown={this.startDrag} ref={this.dragger} style={{left: this.state.left, top: this.state.top}}>
          <div className="node" onClick={this.toggleEdit}>
              {this.state.isEdit ? (<input type="text" name="text" value={this.state.text} onChange={this.handleChange} onClick={(ev) => {ev.stopPropagation()}}/>) : (<span>{this.state.text}</span>)}
              <svg className="nodeIcon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" aria-labelledby="title">
  	           <title id="title">Umbrella Icon</title>
                 <rect width="100%" height="50%" style={{fill:'rgb(255,255,255)',strokeWidth:'0.01em',stroke:'rgb(0,0,0)'}} />
             </svg>
             <button onClick={this.addNode}>Add </button>
          </div>
          {this.state.children.map(node => {
              return <RecNode left={node.left} top={node.top}/>
          })
          }
          </div>
        </div>
    );
  }
}

export default Node
