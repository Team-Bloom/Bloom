import React, { Component } from 'react';
import Routes from './routes.jsx';
import Navbar from './Navbar';

const App = () => {
  return (
    <div id="app">
      <Navbar />
      <div>
        <Routes />
      </div>
    </div>
  );
};

export default App;
