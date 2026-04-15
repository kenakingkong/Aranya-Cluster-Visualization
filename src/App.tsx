import React from 'react';
import logo from './logo.svg';
import { Pods } from './components/Pods';
import { Nodes } from './components/Nodes';
import { Logs } from './components/Logs';

import './App.css';

function App() {
  return (
    <div>
      <header></header>
      <main>
        <h1>Aranya Cluster Visualization</h1>
        <div>
          <Pods />
          <Nodes />
          <Logs />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
