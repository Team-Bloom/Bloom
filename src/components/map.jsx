import React, { Component } from 'react';
import { Node } from './index';
import { db } from '../index.js';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    console.log(this.props);
    const docRef = db
      .collection('Projects')
      .doc(this.props.match.params.projectId);
    const projectObj = await docRef.get();
    console.log('line 15', projectObj.data());
  }

  render() {
    console.log('IT HIT LOOK FOR PARAMS ALL CAPS!', this.props);
    return (
      <div>
        {/* <Chat />  not finished yet*/}
        <div>
          <Node />
        </div>
      </div>
    );
  }
}
