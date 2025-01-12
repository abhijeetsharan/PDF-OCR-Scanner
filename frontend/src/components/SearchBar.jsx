import React, { useState } from 'react';

const SearchBar = ({ onSearchResults, onQueryChange }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    const response = await fetch(`http://localhost:5000/search?query=${query}`);
    const data = await response.json();
    onSearchResults(data);
    onQueryChange(query); // Pass the query to App
  };

  return (
    <div className="max-w-md sm:max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4">Search in Document</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="w-full px-4 py-2 mb-4 sm:mb-0 sm:w-2/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
