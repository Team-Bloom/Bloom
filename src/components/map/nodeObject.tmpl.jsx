import React from 'react';

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

      {/* {props.node.id === undefined ? (
        <div>
          <button onClick={props.addNode}>Add </button>
          <button onClick={props.pasteNode}>Paste</button>
        </div>
      ) : (
        <div> */}
      <div>
        <button onClick={props.addNode}>Add </button>

        <button
          onClick={props.deleteNode}
          disabled={props.node.id === undefined}
        >
          Delete{' '}
        </button>
        <button onClick={props.cutNode} disabled={props.node.id === undefined}>
          Cut
        </button>

        <button
          onClick={props.pasteNode}
          disabled={props.pasteOption.children === undefined}
        >
          Paste
        </button>
      </div>
      {/* </div>
      )} */}
    </div>
  );
}

export default NodeObjectTmpl;
