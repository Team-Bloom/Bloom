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
    this.setState({
      currentCut: node,
    });
  };

  goBack = async () => {
    const previous = this.state.project.history[
      this.state.project.history.length - 1
    ];
    const newHistory = this.state.project.history.slice(
      0,
      this.state.project.history.length - 1
    );
    const newForward = [...this.state.project.forward, previous];
    const newMap = newHistory[newHistory.length - 1];
    try {
      let payload = {
        ...this.state.project,
        maps: newMap.version,
        history: newHistory,
        forward: newForward,
      };
      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .set(payload);
    } catch (err) {
      console.error(err);
    }
  };

  goForward = async () => {
    const newMap = this.state.project.forward.pop();
    const newHistory = [...this.state.project.history, newMap];
    try {
      let payload = {
        ...this.state.project,
        maps: newMap.version,
        history: newHistory,
        forward: this.state.project.forward,
      };
      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .set(payload);
    } catch (err) {
      console.error(err);
    }
  };

  checkState = async mapState => {
    //DANGER ZONE, we are about to change the data to be sent
    //this probably should only happen in a file that only does that
    //to make it clear as possible that our database is being changed and sent

    try {
      let payload = {
        ...this.state.project,
        maps: [mapState],
        history: [...this.state.project.history, { version: [mapState] }],
        forward: [],
      };

      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .set(payload);
    } catch (error) {
      console.error(error);
    }
  };

  clearPaste = () => {
    this.setState({
      currentCut: {},
    });
  };

  render() {
    console.log('STATE', this.state);
    let maps = this.state.project && this.state.project.maps;
    if (!this.props.user.metadata) return <div>Loading...</div>;
    return (
      <MapTmpl
        clearPaste={this.clearPaste}
        project={this.state.project}
        goBack={this.goBack}
        goForward={this.goForward}
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
