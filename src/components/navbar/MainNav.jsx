import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import history from '../../history.js';

const styles = {
  container: {
    display: 'flex',
    'background-color': '#333',
    'justify-content': 'space-between',
    'padding-left': '1%',
    'padding-right': '1%',
    height: '5vh',
    'align-items': 'center',
  },
  left: {
    display: 'flex',
    'justify-content': 'space-between',
    width: '9%',
  },
  link: {
    color: 'white',
    'font-size': '1.3em',
    cursor: 'pointer',
    padding: '4px',
  },
  activeStyle: {
    'background-color': 'white',
    'border-radius': '4px',
    color: 'black',
  },
  dash: {
    'margin-right': '3px',
  },
  map: {
    'margin-left': '3px',
  },
  logo: {
    'margin-right': '7px',
  },
};

class MainNav extends React.Component {
  logOutUser() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out');
        },
        function(error) {
          console.error('Sign Out Error', error);
        }
      );
    history.push('/login');
  }
  render() {
    return (
      <div
        id="nav-container"
        style={{
          ...styles.container,
          position: 'fixed',
          width: '100%',
          top: '0',
        }}
      >
        <div id="nav-left" style={styles.left}>
          <span style={{ ...styles.link, cursor: 'default', ...styles.logo }}>
            Bloom:
          </span>

          <NavLink
            style={{ ...styles.link, ...styles.dash }}
            activeStyle={styles.activeStyle}
            to="/home"
          >
            Dashboard
          </NavLink>
          <NavLink
            style={{ ...styles.link, ...styles.map }}
            activeStyle={styles.activeStyle}
            to={`/map/${this.props.currentMap}`}
          >
            Map
          </NavLink>
        </div>
        <div id="nav-right">
          <span onClick={this.logOutUser} style={styles.link}>
            Sign out
          </span>
        </div>
      </div>
    );
  }
}

export default MainNav;
