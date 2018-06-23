import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Node} from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div className="App-intro">
            <Node />
        </div>
      </div>
    );
  }
}

export default App;
