import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SearchBar from './components/SearchBar';
import SummaryButton from './components/SummaryButton';

const App = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(''); // Keep track of the search query
  const [summary, setSummary] = useState(''); // Store the summary

  const handleTextExtracted = (extractedText) => {
    setText(extractedText);
    setSummary(''); // Clear the summary when new text is uploaded
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const highlightText = (content, query) => {
    if (!query) return content; // If no query, return content as is
    const regex = new RegExp(`(${query})`, 'gi'); // Create a case-insensitive regex
    return content.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">PDF Parsing and Search</h1>
        <UploadForm onTextExtracted={handleTextExtracted} />

        {text && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Extracted Text</h2>
            <p className="text-gray-600">{highlightText(text, query)}</p>

            <SummaryButton text={text} onSummaryGenerated={setSummary} />
          </div>
        )}

        {summary && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
            <p className="text-gray-600">{summary}</p>
          </div>
        )}

        <div className="mt-8">
          <SearchBar
            onSearchResults={(results) => {
              handleSearchResults(results);
            }}
            onQueryChange={(q) => setQuery(q)} // Pass the query back to App
          />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Results</h2>
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <p className="text-gray-800">{highlightText(result.text, query)}</p>
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
