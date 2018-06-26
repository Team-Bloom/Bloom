import React, { Component } from 'react';
import ChatRoom from '../chatRoom/ChatRoom.jsx';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import './sideBar.css';

export default class SideBar extends Component {
  componentWillMount() {
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
    return (
      <div className="sideBar">
        <OffCanvas
          width={300}
          transitionDuration={300}
          isMenuOpened={this.state.isMenuOpened}
          position={'left'}
        >
          <OffCanvasBody className="bodyClass" style={{ fontSize: '10px' }}>
            <a onClick={this.handleClick.bind(this)}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhR_7RvPsRur3UNNk9Nha472mfMu6cCq0e7Swy4co1tpzMsL31" />
            </a>
          </OffCanvasBody>
          <OffCanvasMenu className="menuClass">
            <div>
              <ChatRoom />
            </div>
          </OffCanvasMenu>
        </OffCanvas>
      </div>
    );
  }
}
