import React, { Component } from 'react';

import {Search} from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="http://zogan.de/var/lulz.xml">
            <img class="rss-icon" src="rss.svg" />
          </a>
          <h1 className="App-title">¯\_(ツ)_/¯</h1>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
