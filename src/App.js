import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Cadastrar from './pages/Cadastrar.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route path="/cadastrar" element={ <Cadastrar /> } />
    </Routes>
  );
}

export default App;
