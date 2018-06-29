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
    console.log('state', this.state.project);
    let maps = this.state.project && this.state.project.maps;
    const projectId = this.props.match.params.projectId;
    if (!this.props.user.metadata) return <div>Loading...</div>;
<<<<<<< HEAD
    return !maps ? (
      <div>
        <Node checkState={this.checkState} />
      </div>
    ) : (
      <div>
        <div>
          {maps.map((map, index) => {
            return <Node key={index} node={map} checkState={this.checkState} />;
          })}
          <SideBar
            projectId={this.props.match.params.projectId}
            messages={this.state.project.messages}
            user={this.props.user}
          />
        </div>
      </div>
=======
    return (
      <MapTmpl
        project={this.state.project}
        maps={maps}
        checkState={this.checkState}
        count={this.state.count}
        projectId={this.props.match.params.projectId}
        user={this.props.user}
      />
>>>>>>> f4362faa4af1d3c36e392887d2ad08601f553bf1
    );
  }
}
