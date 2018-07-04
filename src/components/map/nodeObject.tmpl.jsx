import React from 'react';

function NodeObjectTmpl(props) {
  return (
    <div className={`${props.pointed ? 'node pointed' : 'node'}`} onClick={props.toggleEdit}>
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
      <div className={`${props.isEdit ? 'functionButtons visible' : 'functionButtons'}`}>
        <button onClick={props.addNode}>Add </button>
        <button onClick={props.deleteNode}>Delete </button>
        <button onClick={props.cutNode}>Cut</button>
        <button onClick={props.pasteNode}>Paste</button>
        <button onClick={props.point}>Make Point</button>
      </div>
    </div>
  );
}

export default NodeObjectTmpl;
