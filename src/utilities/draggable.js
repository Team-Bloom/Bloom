//TODO: turn this into a module
var dragging_this;

var drag = function(ev){
  //the should edit for child nodes is being attached to the root node
  ev.stopPropagation();
  dragging_this.setState({
    ...dragging_this.state,
    pos1: dragging_this.state.pos3 - ev.clientX,
    pos2: dragging_this.state.pos4 - ev.clientY,
    pos3: ev.clientX,
    pos4: ev.clientY,
    node: {
        ...dragging_this.state.node,
        top: dragging_this.dragger.current.offsetTop - dragging_this.state.pos2,
        left: dragging_this.dragger.current.offsetLeft - dragging_this.state.pos1,
    },
    shouldEdit: false,
  });
};

var stopDrag = function(ev){
  ev.stopPropagation();
  document.onmousemove = null;
  if(!dragging_this.state.shouldEdit){
      dragging_this.checkState();
  }
};

var makeDraggable = function(ev, that){
    ev.stopPropagation();
    dragging_this = that;
    dragging_this.setState({
      ...dragging_this.state,
      pos3: ev.clientX,
      pos4: ev.clientY,
    });
    document.onmousemove = drag;
    document.onmouseup = stopDrag;
}

export default makeDraggable;
