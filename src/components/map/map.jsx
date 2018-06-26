import React, { Component } from 'react';
import { Node } from './index';
import { db } from '../../index.js';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
    };
  }
  async componentDidMount() {
    const docRef = db
      .collection('Projects')
      .doc(this.props.match.params.projectId);
    const projectObj = await docRef.get();
    this.setState({
      project: projectObj.data(),
    });
  }
  checkState = () => {};

  render() {
    const maps = this.state.project.maps;
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
                  checkState={this.checkState}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
