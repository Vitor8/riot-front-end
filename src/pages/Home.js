import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import { Navigate } from 'react-router-dom'

function Home() {
  const [redirectToRegisterPage, setRedirectToRegisterPage] = useState(false);

  return (
    <div>
      <button onClick={ () => setRedirectToRegisterPage(true) }>Cadastrar</button>
      <input type="text" placeholder="Buscar" />
      <br />
      <UsersTable />
      { redirectToRegisterPage ? <Navigate to="/cadastrar" /> : null }
    </div>
  );
}

export default Home;
