import React from 'react'
import { Node } from './'
import SideBar from '../sideBar/sideBar.jsx';
//makeDraggable should be configured in the parent and pass teh whole thing in and then wouldn't need the whole this in here

function MapTmpl(props) {
    return !props.maps ? (
          <div>
            <Node checkState={props.checkState} />
          </div>
        ) : (
          <div>
            <div>
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
                messages={props.messages}
                user={props.user}
              />
            </div>
          </div>
    )
}

export default MapTmpl
