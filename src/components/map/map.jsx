import React, { Component } from 'react';
import { Node } from './index';
import SideBar from '../sideBar/sideBar.jsx';
import { db } from '../../index.js';
import Navbar from '../navbar/Navbar';
import './map.css';

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
  checkState = () => {};

  render() {
    const maps = this.state.project.maps;
    console.log('IT HIT LOOK FOR PARAMS ALL CAPS!', this.props);
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
          <Navbar />
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
          <div className="sideBar">
            <SideBar />
          </div>
        </div>
      </div>
    );
  }
}
