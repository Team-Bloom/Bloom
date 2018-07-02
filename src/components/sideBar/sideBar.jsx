import React, { Component } from 'react';
import ChatRoom from '../chatRoom/ChatRoom.jsx';
import VideoComponent from '../videoChat/videoChat.jsx'
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import './sideBar.css';
import image from './chat.png';

export default class SideBar extends Component {
  UNSAFE_componentWillMount() {
    // sets the initial state
    this.setState({
      isMenuOpened: false,
    });
  }

  handleClick() {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  render() {
    const { projectId, messages } = this.props;
    return (
      <div className="sideBar">
        <OffCanvas
          width={300}
          transitionDuration={500}
          isMenuOpened={this.state.isMenuOpened}
          position={'left'}
        >
          <OffCanvasBody className="bodyClass">
            <a onClick={this.handleClick.bind(this)}>
              <img src={image} />
            </a>
          </OffCanvasBody>
          <OffCanvasMenu className="menuClass">
            <div>
              <div>
                <VideoComponent identity={this.props.user} roomName={projectId}/>
              </div>
              <ChatRoom user={this.props.user} projectId={projectId} messages={messages} />
            </div>
          </OffCanvasMenu>
        </OffCanvas>
      </div>
    );
  }
}
