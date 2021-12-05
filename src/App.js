import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Cadastrar from './pages/Cadastrar.js';
import Atualizar from './pages/Atualizar.js';
import Detalhes from './pages/Detalhes.js';

import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route path="/cadastrar" element={ <Cadastrar /> } />
      <Route path="/atualizar" element={ <Atualizar /> } />
      <Route path="/detalhes" element={ <Detalhes /> } />
    </Routes>
  );
}

export default App;
