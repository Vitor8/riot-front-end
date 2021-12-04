import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;
