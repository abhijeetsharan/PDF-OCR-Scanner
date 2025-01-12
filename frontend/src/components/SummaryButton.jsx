import React from 'react';

const SummaryButton = ({ text, onSummaryGenerated }) => {
  const generateSummary = async () => {
    if (!text) return;

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.summary) {
        onSummaryGenerated(data.summary);
      } else {
        alert('Failed to generate summary');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating summary');
    }
  };

  return (
    <button
      onClick={generateSummary}
      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
    >
      Generate Summary
    </button>
  );
};

export default SummaryButton;
