import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import '../css/Header.css';
import ROIT from '../images/roit-logo.png';

function Header() {
  const [returnHome, setReturnHome] = useState(false);

  return (
    <header className="header-container">
      <img
        src={ ROIT }
        alt="roit-logo"
        height="45px"
        width="130px"
        className="logo-image"
        onClick={ () => setReturnHome(true) }
      />
      { returnHome && <Navigate to="/home" /> }
    </header>
  )
}

export default Header
