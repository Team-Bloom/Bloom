import React, { Component } from 'react';
import { Node, MapTmpl } from './index';
import SideBar from '../sideBar/sideBar.jsx';
import { db } from '../../exports.js';
import Navbar from '../navbar/Navbar';
import firebase from 'firebase';
import Toolbar from './Toolbar.jsx';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      source: '',
      currentCut: {},
      count: 0,
    };
  }

  componentDidMount() {
    if (this.props.match.params.projectId) {
      const docRef = db
        .collection('Projects')
        .doc(this.props.match.params.projectId);

      this.unsubscribe = docRef.onSnapshot(doc => {
        this.setState({
          project: doc.data(),
          count: this.state.count + 1,
        });
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  currentCut = node => {
    console.log('running');
    this.setState({
      currentCut: node,
    });
  };

  checkState = async mapState => {
    await this.setState({
      project: {
        ...this.state.project,
        maps: [mapState],
      },
    });
    //DANGER ZONE, we are about to change the data to be sent
    //this probably should only happen in a file that only does that
    //to make it clear as possible that our database is being changed and sent

    const obj = this.state.project;
    try {
      let payload = { ...this.state.project, maps: [mapState] };
      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .set(payload);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let maps = this.state.project && this.state.project.maps;
    if (!this.props.user.metadata) return <div>Loading...</div>;
    return (
      <MapTmpl
        project={this.state.project}
        maps={maps}
        checkState={this.checkState}
        count={this.state.count}
        projectId={this.props.match.params.projectId}
        user={this.props.user}
        currentCut={this.currentCut}
        pasteOption={this.state.currentCut}
      />
    );
  }
}
