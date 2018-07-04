import React from 'react';
import { NodeObject, Node } from './';
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function NodeTmpl(props) {
  return (
    <div className="nodeWrap">
      {props.node && (
        <div>
          <div
            className={props.node.collapsed ? 'collapsed dragger' : 'dragger'}
            onMouseDown={props.func}
            ref={props.dragger}
            style={{ left: props.node.left + 'px', top: props.node.top + 'px' }}
          >
            <NodeObject
              addNode={props.addNode}
              handleChange={props.handleChange}
              text={props.node && props.node.text}
              pointed={props.node && props.node.pointed}
              checkState={props.checkState}
              deleteNode={props.deleteNode}
              id={props.node && props.node.id}
              cutNode={props.cutNode}
              point={props.point}
              currentCut={props.currentCut}
              pasteNode={props.pasteNode}
              collapse={props.collapse}
            />
            {props.node &&
              !props.node.collapsed &&
              props.node.children &&
              props.node.children.map(node => {
                return (
                  <Node
                    checkState={props.checkState}
                    deleteNode={props.deleteNode}
                    node={node}
                    count={props.count}
                    cutNode={props.cutNode}
                    currentCut={props.currentCut}
                    pasteOption={props.pasteOption}
                    pasteNode={props.pasteNode}
                    clearPaste={props.clearPaste}
                  />
                );
              })}
          </div>
          <svg
            className="line"
            height={
              props.node &&
              props.node.top &&
              Math.abs(props.node.top) + 2 + 'px'
            }
            width={
              props.node &&
              props.node.left &&
              Math.abs(props.node.left) + 2 + 'px'
            }
          >
            <path d={`m-100,0l100,0c100,0,${props.node.left - 200},${props.node.top},${props.node.left - 89},${props.node.top},l100,0`}
              style={{ stroke: 'rgb(0,0,0)', strokeWidth: 2, fill: 'none'}}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default NodeTmpl;
