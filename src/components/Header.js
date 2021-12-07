import React from 'react';
import '../css/Header.css';
import ROIT from '../images/roit-logo.png';

function Header() {
  return (
    <header className="header-container">
      <img
        src={ ROIT }
        alt="roit-logo"
        height="45px"
        width="130px"
        className="logo-image"
      />
    </header>
  )
}

export default Header
