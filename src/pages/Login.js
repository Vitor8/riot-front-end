import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  async function loginWithAuthentification() {
    const rawResponse = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await rawResponse.json();
    const token = data['token'];
    localStorage.setItem('token', JSON.stringify(token));

    setRedirectToHomePage(true);
  }

  return (
    <div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" onChange={ (e) => setEmail(e.target.value)  } />
      </div>
      <br />

      <div>
        <label htmlFor="senha">Senha: </label>
        <input type="text" id="senha" onChange={ (e) => setPassword(e.target.value)  } />
      </div>

      <br />
      <button onClick={ () => loginWithAuthentification() }>Login</button>

      { redirectToHomePage && <Navigate to='/home' /> }
    </div>
  )
}

export default Login;
