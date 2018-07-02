import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardText from '@material-ui/core/CardContent';
export default class VideoComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '', // Track the current active room
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
  }
  handleRoomNameChange(err) {
    let roomName = err.target.value;
    this.setState({ roomName });
  }
  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }
    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName,
    };
    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }
    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(
      this.state.token,
      connectOptions
    ).then(this.roomJoined, error => {
      alert('Could not connect to Twilio: ' + error.message);
    });
  }
  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }
  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }
  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }
  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }
  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });
    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }
    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });
    // When a Participant joins the Room, log the event.
    room.on('participantConnected', participant => {
      console.log("Joining: '" + participant.identity + "'");
    });
    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });
    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(participant.identity + ' removed track: ' + track.kind);
      this.detachTracks([track]);
    });
    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });
    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.setState({ activeRoom: null });
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  }
  componentDidMount = async () => {
    //we'll use this function when we deploy this to firebase for production
    // const token = functions.httpsCallable('token');
    await axios
      .get(`http://localhost:5000/bloom-895e7/us-central1/token`)
      .then(results => {
        const { identity, token } = results.data;
        this.setState({ identity, token });
      });
    // this.setState({ roomName: 'Test' });
    this.joinRoom();
  };
  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }
  render() {
    // Only show video track after user has joined a room
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <div ref="localMedia" />
      </div>
    ) : (
      ''
    );
    // Hide 'Join Room' button if user has already joined a room.
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <Button color="secondary" onClick={this.leaveRoom}>
        Leave Room
      </Button>
    ) : (
      <Button color="primary" onClick={this.joinRoom}>
        Join Room
      </Button>
    );
    return (
      <Card>
        <CardText>
          <div className="flex justify-around flex-wrap">
            <div className="flex flex-column">
              {showLocalTrack}
              <div>
                <TextField
                  placeholder="Room Name"
                  onChange={this.handleRoomNameChange}
                  error={!!this.state.roomNameErr}
                  value={this.state.roomName}
                />
                <br />
                {joinOrLeaveRoomButton}
              </div>
            </div>
            <div ref="remoteMedia" id="remote-media" />
          </div>
        </CardText>
      </Card>
    );
  }
}
