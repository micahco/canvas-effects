import React, { useState, useEffect } from 'react'
import './App.css';
import GalileoDemo from 'components/Demo/Galileo';
import DelaunayDemo from 'components/Demo/Delaunay';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme(true)
    }
  }, [setDarkTheme])

  useEffect(() => {
    document.querySelector(':root').classList.toggle('dark');
  }, [darkTheme])

  return (
    <div className="App">
      <header className="header">
        <h1>canvas-effects</h1>
        <p>A modular HTML Canvas library. Written in TypeScript</p>
        <p>This demo was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.</p>
        <a href="https://badge.fury.io/js/canvas-effects"><img src="https://badge.fury.io/js/canvas-effects.svg" alt="npm version" height="18"/></a>
        <p><a href="https://github.com/micahco/canvas-effects">Source</a></p>
        <button aria-pressed={darkTheme} onClick={() => {setDarkTheme(!darkTheme)}}>
          Switch to {darkTheme ? 'light' : 'dark'} theme
        </button>
      </header>
      <main>
        <div className='gallery'>
          <GalileoDemo darkTheme={darkTheme} />
          <DelaunayDemo darkTheme={darkTheme} />
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Micah Cowell.</p>
      </footer>
    </div>
  );
}

export default App;
