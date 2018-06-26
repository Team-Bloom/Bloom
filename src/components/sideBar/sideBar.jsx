import React, { Component } from 'react';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import './sideBar.css'

export default class SideBar extends Component {

  componentWillMount() {
    // sets the initial state
    this.setState({
      isMenuOpened: false
    })
  }


  render() {
    return (
      <OffCanvas width={300} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"right"}>
        <OffCanvasBody className='bodyClass' style={{fontSize: '30px'}}>
          <p>This is the main body container.</p>
          <p><a href="#" onClick={this.handleClick.bind(this)}>Click here</a> to toggle the menu.</p>
        </OffCanvasBody>
        <OffCanvasMenu className='menuClass'>
          <p>Placeholder content.</p>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
            <li><a href="#" onClick={this.handleClick.bind(this)}>Toggle Menu</a></li>
          </ul>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }

  handleClick() {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

}
