import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <div className="searchbar-wrapper">
        <input
          type="text"
          className="searchbar"
          placeholder="Search for movies..."
        />
        <span className="searchbar-icon">&#9906;</span>
      </div>
    </div>
  );
};

export default SearchBar;
