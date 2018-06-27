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

  componentDidMount() {
    if (this.props.match.params.projectId) {
      const docRef = db
        .collection('Projects')
        .doc(this.props.match.params.projectId);
      this.unsubscribe = docRef.onSnapshot(doc => {
        const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
        console.log(source, ' data: ', doc.data());
        this.setState({
          project: doc.data(),
        });
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkState = async mapState => {
    //DANGER ZONE, we are about to change the data to be sent
    //this probably should only happen in a file that only does that
    //to make it clear as possible that our database is being changed and sent

    // console.log('incomingState', mapState);
    if (this.state.project.maps) {
      await this.setState({
        project: {
          ...this.state.project,
          maps: [mapState],
        },
      });
    } else {
      await this.setState({
        project: {
          ...this.state.project,
          maps: [mapState],
        },
      });
    }

    const obj = this.state.project;
    try {
      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .update({ maps: [mapState] });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log('rerender');
    console.log(this.state.project);
    const maps = this.state.project.maps;
    return !maps ? (
      <div>
        <Navbar />
        <Node checkState={this.checkState} />
        <div className="sideBar">
          <SideBar />
        </div>
      </div>
    ) : (
      <div>
        <div>
          <Navbar projectId={this.props.match.params.projectId} />
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
          <SideBar />
        </div>
      </div>
    );
  }
}
