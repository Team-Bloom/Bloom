import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import history from '../../history.js';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#333',
    justifyContent: 'space-between',
    paddingLeft: '1%',
    paddingRight: '1%',
    height: '5vh',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '9%',
  },
  link: {
    color: 'white',
    fontSize: '1.3em',
    cursor: 'pointer',
    padding: '4px',
  },
  activeStyle: {
    backgroundColor: 'white',
    borderRadius: '4px',
    color: 'black',
  },
  dash: {
    marginRight: '3px',
  },
  map: {
    marginLeft: '3px',
  },
  logo: {
    marginRight: '7px',
  },
};

class MainNav extends Component {
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
            to={`/map/${this.props.user.lastProject}`}
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
