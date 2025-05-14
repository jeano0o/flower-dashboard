import React from 'react';
import Flower from './components/Flower';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Bloom where you gloom.</h1>
        <p>The only way out is through.</p>
      </header>
      <Flower />
    </div>
  );
}

export default App;

