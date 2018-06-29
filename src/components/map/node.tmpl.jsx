import React, { Component } from 'react'
import { NodeObject, Node } from './'
import {makeHashCode, makeDraggable} from '../../utilities/'
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function NodeTmpl(props) {
    return (
        <div className="nodeWrap">
          {props.node && (<div><svg
            className="line"
            height={props.node && props.node.top && Math.abs(props.node.top) + 2 + 'px'}
            width={props.node && props.node.left && Math.abs(props.node.left) + 2 + 'px'}
          >
            <line
              x1="0"
              y1="0"
              x2={props.node.left + 'px'}
              y2={props.node.top + 'px'}
              style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }}
            />
          </svg>
          <div
            className="dragger"
            onMouseDown={props.func}
            ref={props.dragger}
            style={{ left: props.node.left + 'px', top: props.node.top + 'px' }}
          >
            <NodeObject
              addNode={props.addNode}
              handleChange={props.handleChange}
              text={props.node && props.node.text}
              checkState={props.checkState}
              deleteNode={props.deleteNode}
              id={props.node && props.node.id}
            />
            { props.node &&
              props.node.children &&
              props.node.children.map(node => {
                return (
                  <Node
                    checkState={props.checkState}
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
