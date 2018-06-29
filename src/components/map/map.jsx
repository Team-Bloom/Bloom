import React, { Component } from 'react';
import { Node, MapTmpl } from './index';
import SideBar from '../sideBar/sideBar.jsx';
import { db } from '../../index.js';
import Navbar from '../navbar/Navbar';
import firebase from 'firebase';
import Toolbar from './Toolbar.jsx';
var source;
var count;

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      source: '',
      currentCut: {},
    };
  }
  componentDidMount() {
    // const test = await firebase.auth().currentUser;
    // console.log(test)
    count = 0;
    if (this.props.match.params.projectId) {
      const docRef = db
        .collection('Projects')
        .doc(this.props.match.params.projectId);

      this.unsubscribe = docRef.onSnapshot(doc => {
        source =
          doc.metadata.hasPendingWrites || count === 0 ? 'Local' : 'Server';
        console.log(source, ' data: ', doc.data());
        const proj = doc.data();
        console.log('proj data!!!!', proj);
        count += 1;
        this.setState({
          project: doc.data(),
          source: source,
          count: count,
        });
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setLocal = () => {
    source = 'Local';
  };

  currentCut = node => {
    console.log('running');
    this.setState({
      currentCut: node,
    });
  };

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
    console.log('cut', this.state.currentCut);
    console.log('state', this.state);
    let maps = this.state.project && this.state.project.maps;
    const projectId = this.props.match.params.projectId;
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
