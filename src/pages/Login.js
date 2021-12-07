import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);
  const [disableLoginButton, setDisableLoginButton] = useState(true);

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

  useEffect(() => {
    if (email !== '' && password !== '') setDisableLoginButton(false);
  }, [email, password]);

  return (
    <div className="login-page">
      
      <div className="login-container">
        <div>
          <label htmlFor="email" data-testid="email-label">Email </label><br />
          <input type="text" id="email" onChange={ (e) => setEmail(e.target.value)  } data-testid="email-input"/>
        </div>
        <br />

        <div>
          <label htmlFor="senha" data-testid="password-label">Senha </label><br />
          <input type="password" id="senha" onChange={ (e) => setPassword(e.target.value)  } data-testid="password-input" />
        </div>

        <br />
        <button
          onClick={ () => loginWithAuthentification() }
          data-testid="login-button"
          disabled={ disableLoginButton }
        >
          Login
        </button>
      </div>

      { redirectToHomePage && <Navigate to='/home' /> }
    </div>
  )
}

export default Login;
