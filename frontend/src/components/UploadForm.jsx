import React, { useState } from 'react';

const UploadForm = ({ onTextExtracted }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For PDF preview

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);

      // Create a URL for the PDF to preview it
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      setError("Please upload a valid PDF file.");
      setPreviewUrl(null); // Clear preview if file is not valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        onTextExtracted(data.text);
      } else {
        setError(data.error || 'Failed to extract text');
      }
    } catch (error) {
      setError('Error uploading file');
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Upload PDF for Text Extraction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Choose PDF
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Display PDF preview */}
        {previewUrl && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">Preview:</h3>
            <embed src={previewUrl} width="100%" height="400px" type="application/pdf" />
          </div>
        )}

        {file && (
          <p className="text-center text-gray-600">Selected file: {file.name}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          Upload
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default UploadForm;
