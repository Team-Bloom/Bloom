import React, { Component } from 'react';
import { Node } from './index';
import SideBar from '../sideBar/sideBar.jsx';
import { db } from '../../index.js';
import Navbar from '../navbar/Navbar';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.projectId) {
      const docRef = db
        .collection('Projects')
        .doc(this.props.match.params.projectId);
      const projectObj = await docRef.get();
      this.setState({
        project: projectObj.data(),
      });
    }
  }
  checkState = (mapState) => {
      //DANGER ZONE, we are about to change the data to be sent
      //this probably should only happen in a file that only does that
      //to make it clear as possible that our database is being changed and sent
      console.log("incomingState", mapState)
      if(this.state.project.maps){
          this.setState({
              project: {
                  maps: [mapState]
              }
          })
      } else {
          this.setState({project: {
              maps: [mapState]
          }})
      }
  };

  render() {
    const maps = this.state.project.maps;
    return !maps ? (
      <div>
        <Navbar />
        <Node checkState={this.checkState} />
      </div>
    ) : (
      <div>
        <div>
          <Navbar projectId={this.props.match.params.projectId}/>
          {maps.map(map => {
            return (
              <Node
                left={map.left}
                top={map.top}
                text={map.text}
                children={map.children}
                checkState={this.checkState}
              />
            );
          })}
            <SideBar projectId={this.props.match.params.projectId} />
        </div>
      </div>
    );
  }
}
