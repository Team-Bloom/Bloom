import React, { Component } from 'react'
import { NodeObject, Node } from './'
import {makeHashCode, makeDraggable} from '../../utilities/'
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function NodeTmpl(props) {
    return (
        <div className="nodeWrap">
          {props.that.state.node && (<div><svg
            className="line"
            height={props.that.state.node && props.that.state.node.top && Math.abs(props.that.state.node.top) + 2 + 'px'}
            width={props.that.state.node && props.that.state.node.left && Math.abs(props.that.state.node.left) + 2 + 'px'}
          >
            <line
              x1="0"
              y1="0"
              x2={props.that.state.node.left + 'px'}
              y2={props.that.state.node.top + 'px'}
              style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }}
            />
          </svg>
          <div
            className="dragger"
            onMouseDown={(ev) => {makeDraggable(ev, props.that)}}
            ref={props.that.dragger}
            style={{ left: props.that.state.node.left + 'px', top: props.that.state.node.top + 'px' }}
          >
            <NodeObject
              addNode={props.that.addNode}
              handleChange={props.that.handleChange}
              text={props.that.state.node && props.that.state.node.text}
              checkState={props.that.checkState}
              deleteNode={props.that.deleteNode}
              id={props.that.state.node && props.that.state.node.id}
            />
            {props.that.state &&
              props.that.state.node &&
              props.that.state.node.children &&
              props.that.state.node.children.map(node => {
                return (
                  <Node
                    checkState={props.that.checkState}
                    deleteNode={props.that.deleteNode}
                    node={node}
                    count={props.that.props.count}
                  />
                );
              })
            }
          </div>
          </div>)}
        </div>
    )
}

export default NodeTmpl
