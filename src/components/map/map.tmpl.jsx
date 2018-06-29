import React from 'react';
import { Node } from './';
import SideBar from '../sideBar/sideBar.jsx';
import Toolbar from './Toolbar'
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function MapTmpl(props) {
  if (!props.project) return <div>Loading...</div>;
  return !props.maps ? (
    <div>
      <Toolbar />

      <Node checkState={props.checkState} />
    </div>
  ) : (
    <div>
      <div>
        <Toolbar project={props.project} projectId={props.projectId} />
        {props.maps.map((map, index) => {
          return (
            <Node
              key={index}
              node={map}
              checkState={props.checkState}
              count={props.count}
            />
          );
        })}
        <SideBar
          projectId={props.projectId}
          messages={props.project.messages}
          user={props.user}
        />
      </div>
    </div>
  );
}

export default MapTmpl;
