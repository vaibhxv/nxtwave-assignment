// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Search by resource name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
);

export default SearchBar;
