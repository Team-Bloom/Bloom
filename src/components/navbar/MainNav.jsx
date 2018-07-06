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
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '0.9em',
    marginTop: '13px',
    cursor: 'pointer',
    padding: '4px',
    letterSpacing: '0.5px',
  },
  activeStyle: {
    textDecoration: 'underline',
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
          zIndex: '102',
        }}
      >
        <div id="nav-left" style={styles.left}>
          <span style={{ ...styles.link, cursor: 'default', ...styles.logo }}>
            <svg
              style={{ width: '54px', marginTop: '-9px' }}
              id="179116ad-bed5-49f4-abe2-a2445bf96616"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 59.24 35.07"
            >
              <title>bloomLogo</title>
              <path
                d="M9.39,13.33V26.8h1.53V25a3.43,3.43,0,0,0,3.16,2c2.13,0,3.71-1.9,3.71-4.82s-1.53-4.58-3.71-4.58a3.28,3.28,0,0,0-3,1.64V14.4l-.92,2.93-.75-4ZM13.61,25.6c-1.48,0-2.55-1.27-2.55-3.38s1-3.39,2.6-3.39c1.39,0,2.37,1.26,2.37,3.45s-1,3.32-2.42,3.32Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <polygon
                points="17.23 11.37 15.55 11.37 15.55 24.36 17.23 24.36 17.23 11.37 17.23 11.37"
                fill="#79c143"
              />
              <path
                d="M28.35,17.53c-2.75,0-4.48,1.79-4.48,4.75S25.6,27,28.35,27s4.49-1.8,4.49-4.74-1.73-4.75-4.49-4.75Zm0,8.16c-1.58,0-2.7-1.36-2.7-3.43s1.12-3.45,2.7-3.45,2.71,1.32,2.71,3.45-1.1,3.43-2.71,3.43Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <path
                d="M38.88,17.53c-2.74,0-4.47,1.79-4.47,4.75S36.14,27,38.88,27s4.49-1.8,4.49-4.74-1.73-4.75-4.49-4.75Zm0,8.16c-1.59,0-2.71-1.36-2.71-3.43s1.12-3.45,2.71-3.45,2.7,1.32,2.7,3.45-1.1,3.43-2.7,3.43Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <path
                d="M55.89,17.55a3.32,3.32,0,0,0-3.07,2,2.72,2.72,0,0,0-2.67-2,3.26,3.26,0,0,0-3,1.88V17.75H45.63V26.8h1.66V22.19c0-2,1-3.16,2.25-3.16s1.82.85,1.82,2.69V26.8H53V22.19c0-2,.92-3.16,2.33-3.16,1.21,0,1.75.88,1.75,2.69V26.8h1.67V21.34c0-2.49-1-3.79-2.9-3.79Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <path
                d="M63.34,10.34V30.58h-6l-.11.17-2.43,3.59-2.75-3.61L52,30.58H4.83V10.34H63.34M63.7,10H4.46V31H51.78l3.06,4,2.71-4H63.7V10Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <path
                d="M17.7,36.08c-2.41,0-8-.5-8-5.15h1c0,2.69,2.5,4.18,7,4.18l37.11,0v1Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
              />
              <path
                d="M10.94,19.31l-.56-.25.28.13-.3-.05s0-.29,0-2.27c0-2.13.56-2.56,1.35-2.93s1.55-.73,1.55-5l.06-.72.61.05-.06.7c0,4.32-.82,5.05-1.9,5.56-.56.26-1,.47-1,2.38A12.34,12.34,0,0,1,10.94,19.31Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
                stroke="#79c143"
                stroke-miterlimit="10"
                stroke-width="0.25"
              />
              <circle cx="50.35" cy="33.19" r="1.88" fill="#79c143" />
              <circle cx="9.24" cy="5.45" r="0.86" fill="#79c143" />
              <rect
                x="5.45"
                y="1.46"
                width="0.61"
                height="15.63"
                fill="#79c143"
                stroke="#79c143"
                stroke-miterlimit="10"
                stroke-width="0.25"
              />
              <path
                d="M10.11,19.19H9.5V16.87c0-3.21-.67-3.62-1.38-4.06s-1.68-1-1.68-4.62V6.81H7V8.19c0,3.24.68,3.66,1.4,4.1s1.67,1,1.67,4.58Z"
                transform="translate(-4.46 -2.45)"
                fill="#79c143"
                stroke="#79c143"
                stroke-miterlimit="10"
                stroke-width="0.25"
              />
              <circle cx="5.78" cy="0.86" r="0.86" fill="#79c143" />
              <circle cx="2.3" cy="3.89" r="0.86" fill="#79c143" />
            </svg>
          </span>
          <NavLink
            style={{ ...styles.link, ...styles.map }}
            activeStyle={styles.activeStyle}
            to={`/map/${this.props.user.lastProject}`}
          >
            Map
          </NavLink>
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
