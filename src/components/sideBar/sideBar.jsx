import React, { Component } from 'react';
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
      <OffCanvas
        width={300}
        transitionDuration={300}
        isMenuOpened={this.state.isMenuOpened}
        position={'left'}
      >
        <OffCanvasBody className="bodyClass" style={{ fontSize: '10px' }}>
            <a onClick={this.handleClick.bind(this)}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhR_7RvPsRur3UNNk9Nha472mfMu6cCq0e7Swy4co1tpzMsL31"/>
            </a>
        </OffCanvasBody>
        <OffCanvasMenu className="menuClass">
          <p>Placeholder content.</p>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
            <li>
              <a onClick={this.handleClick.bind(this)}>
                Toggle Menu
              </a>
            </li>
          </ul>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }
}
