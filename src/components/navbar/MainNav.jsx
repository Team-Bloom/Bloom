import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink, Link } from 'react-router-dom';
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

class MainNav extends React.Component {
  constructor() {
    super();

    this.state = {
      user: true,
    };

    this.logOutUser = this.logOutUser.bind(this);
  }

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

    this.setState({
      user: false,
    });

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
          {this.state.user && this.props.user.metadata ? (
            <NavLink
              style={{ ...styles.link, ...styles.dash }}
              activeStyle={styles.activeStyle}
              to="/home"
            >
              Dashboard
            </NavLink>
          ) : (
            <div />
          )}
          <NavLink
            style={{ ...styles.link, ...styles.map }}
            activeStyle={styles.activeStyle}
            to={`/map/${this.props.user.lastProject}`}
          >
            Map
          </NavLink>
        </div>
        <div id="nav-right">
          {this.state.user && this.props.user ? (
            <span onClick={this.logOutUser} style={styles.link}>
              Sign out
            </span>
          ) : (
            <Link to="/login">
              <span style={styles.link}>Sign in</span>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default MainNav;
