import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-rule">
        <span className="header-star">&#9733; &#9733; &#9733;</span>
      </div>
      <h1>Movie Browser</h1>
      <p className="header-subtitle">Curated Cinema Collection</p>
    </header>
  );
};

export default Header;
