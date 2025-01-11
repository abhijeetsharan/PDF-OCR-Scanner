import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleTextExtracted = (extractedText) => {
    setText(extractedText);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">
          PDF Parsing and Search
        </h1>
        
        <UploadForm onTextExtracted={handleTextExtracted} />
        
        {text && (
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">Extracted Text</h2>
            <p className="text-gray-600">{text}</p>
          </div>
        )}

        <div className="mt-8">
          <SearchBar onSearchResults={handleSearchResults} />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">Search Results</h2>
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <p className="text-gray-800">{result.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
