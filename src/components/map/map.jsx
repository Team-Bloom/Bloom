import React, { Component } from 'react';
import { MapTmpl } from './index';
import { db } from '../../exports.js';
import Navbar from '../navbar/Navbar';
import firebase from 'firebase';
import Toolbar from './Toolbar.jsx';
import '../navbar/navbar.css';

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

  updateTimestamp = () => {
    const projectId = this.props.match.params.projectId;
    this.state.project.metadata.collaborators.forEach(async el => {
      const user = await db
        .collection('Users')
        .doc(el.email)
        .update({
          [`projects.${projectId}.lastUpdated`]: Date.now(),
        });
    });
  };

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
    if (this.props.match.params.projectId) {
      this.unsubscribe();
    }
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

      this.updateTimestamp();
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

      this.updateTimestamp();
    } catch (err) {
      console.error(err);
    }
  };

  checkState = async mapState => {
    //DANGER ZONE, we are about to change the data to be sent
    //this probably should only happen in a file that only does that
    //to make it clear as possible that our database is being changed and sent
    const projectId = this.props.match.params.projectId;
    try {
        let history;
        if(this.state.project.history.length > 60){
            history = this.state.project.history.slice(-59)
        } else {
            history = this.state.project.history
        }
      let payload = {
        ...this.state.project,
        maps: [mapState],
        history: [...history, { version: [mapState] }],
        forward: [],
        'metadata.lastUpdated': Date.now(),
      };

      const docRef = await db
        .collection('Projects')
        .doc(projectId)
        .set(payload);

      this.updateTimestamp();
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
