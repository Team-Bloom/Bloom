import React, { Component } from 'react';
import { Node } from './index';
import { db } from '../index.js';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
    };
  }
  async componentDidMount() {
    console.log(this.props);
    const docRef = db
      .collection('Projects')
      .doc(this.props.match.params.projectId);
    const projectObj = await docRef.get();
    console.log('line 15', projectObj.data());
    this.setState({
      project: projectObj.data(),
    });
  }

  render() {
    const maps = this.state.project.maps;
    console.log('IT HIT LOOK FOR PARAMS ALL CAPS!', this.props);
    if (!maps) return <div>Loading...</div>;
    return (
      <div>
        {/* <Chat />  not finished yet*/}
        <div>
          {maps.map(map => {
            return (
              <div>
                <Node
                  left={map.left}
                  top={map.top}
                  text={map.text}
                  children={map.children}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
