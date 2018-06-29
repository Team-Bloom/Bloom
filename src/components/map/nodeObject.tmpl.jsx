import React, { Component } from 'react'
import { NodeObject, Node } from './'
import {makeHashCode, makeDraggable} from '../../utilities/'
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function NodeObjectTmpl(props) {
    return (
        <div className="node" onClick={props.toggleEdit}>
          {props.isEdit ? (
            <input
              type="text"
              name="text"
              value={props.text}
              onChange={props.handleChange}
              onClick={ev => {
                ev.stopPropagation();
              }}
            />
          ) : (
            <span>{props.text}</span>
          )}
          <svg
            className="nodeIcon"
            width="100%"
            viewBox="0 0 32 32"
            aria-labelledby="title"
          >
            <title id="title">{props.text}</title>
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
          <button onClick={props.addNode}>Add </button>
          <button onClick={props.deleteNode}>Delete </button>
        </div>
    )
}

export default NodeObjectTmpl
