import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar"
        placeholder="Search for movies..."
      />
    </div>
  );
};

export default SearchBar;
