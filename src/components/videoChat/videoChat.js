import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

export default class VideoComponent extends Component {
 constructor(props) {
   super();
   this.state = {
     identity: null,
     roomName: '',
     roomNameErr: false,
     previewTracks: null,
     localMediaAvailable: false,
     hasJoinedRoom: false,
     activeRoom: null
   }
 }

 async componentDidMount() {
   const { identity, token } = await axios.get('/token)')
   this.setState({
     identity,
     token
   })
 }

 render() {
   return (
     <div>Video Component</div>
   );
 }
}
