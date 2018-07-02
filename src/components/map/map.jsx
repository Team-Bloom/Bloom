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
      forward: {},
      back: true,
      history: [],
      forward: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.projectId) {
      const docRef = db
        .collection('Projects')
        .doc(this.props.match.params.projectId);

      this.unsubscribe = docRef.onSnapshot(doc => {
        console.log('snapshot', this.state.history);
        this.setState({
          project: doc.data(),
          count: this.state.count + 1,
          // back: true,
          // history: [...this.state.history, { version: doc.data().maps }],
          // index: this.state.index + 1,
        });
        if (!this.state.history.length) {
          this.setState({
            history: [{ version: doc.data().maps }],
          });
        }
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
    const previous = this.state.history[this.state.history.length - 1];
    await this.setState({
      history: this.state.history.slice(0, this.state.history.length - 1),
      forward: [...this.state.forward, previous],
    });
    const newMap = this.state.history[this.state.history.length - 1];
    try {
      let payload = {
        ...this.state.project,
        maps: newMap.version,
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
    const newMap = this.state.forward.pop();
    await this.setState({ history: [...this.state.history, newMap] });
    try {
      let payload = {
        ...this.state.project,
        maps: newMap.version,
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
    console.log('does check state run?');
    this.setState({
      project: {
        ...this.state.project,
        maps: [mapState],
        // history: [...this.state.history, { version: [mapState] }],
        // forward: [],
      },
    });
    //DANGER ZONE, we are about to change the data to be sent
    //this probably should only happen in a file that only does that
    //to make it clear as possible that our database is being changed and sent

    const obj = this.state.project;
    try {
      let payload = {
        ...this.state.project,
        maps: [mapState],
      };

      this.setState({
        history: [...this.state.history, { version: [mapState] }],
        forward: [],
      });
      const docRef = await db
        .collection('Projects')
        .doc(this.props.match.params.projectId)
        .set(payload);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log('STATE', this.state);
    let maps = this.state.project && this.state.project.maps;
    if (!this.props.user.metadata) return <div>Loading...</div>;
    return (
      <MapTmpl
        project={this.state.project}
        history={this.state.history}
        forward={this.state.forward}
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
