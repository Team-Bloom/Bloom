//not totally sure if this is returning 1 factory item for each node, or a new item each time it is called

const makeDraggable = function(ev, that){
    let draggingThis
    const drag = (ev) => {
      //the should edit for child nodes is being attached to the root node
      ev.stopPropagation()
      draggingThis.setState({
        ...draggingThis.state,
        pos1: draggingThis.state.pos3 - ev.clientX,
        pos2: draggingThis.state.pos4 - ev.clientY,
        pos3: ev.clientX,
        pos4: ev.clientY,
        node: {
            ...draggingThis.state.node,
            top: draggingThis.dragger.current.offsetTop - draggingThis.state.pos2,
            left: draggingThis.dragger.current.offsetLeft - draggingThis.state.pos1,
        },
        shouldEdit: false,
      })
    }

    const stopDrag = (ev) => {
      ev.stopPropagation()
      document.onmousemove = null
      if (!draggingThis.state.shouldEdit){
          draggingThis.checkState()
      }
    }

    return function(ev, that){
        ev.stopPropagation()
        draggingThis = that
        draggingThis.setState({
          ...draggingThis.state,
          pos3: ev.clientX,
          pos4: ev.clientY,
        })
        document.onmousemove = drag
        document.onmouseup = stopDrag
    }
}()

export default makeDraggable
