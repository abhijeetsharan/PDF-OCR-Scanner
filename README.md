# PDF Parsing and Search Application

A web-based application designed for uploading, parsing, and interacting with PDF documents. Extract text from PDFs, perform keyword-based searches, and generate concise summaries using modern NLP techniques.

## Features

* **PDF Upload and Parsing**: Extract text from uploaded PDF files
* **Search and Highlight**: Search for keywords in the extracted text and highlight occurrences
* **Text Summarization**: Generate summaries of the extracted text for a quick overview
* **User-Friendly Interface**: Intuitive design with React and Tailwind CSS

## Technologies Used

### Frontend:
* React.js
* Tailwind CSS

### Backend:
* Flask
* Python
* Tesseract OCR (for text extraction)
* Hugging Face Transformers (for text summarization)

### Database:
* MongoDB Atlas (optional for storing extracted text)

## Requirements

### Prerequisites:
* Node.js
* Python (3.8+)
* pip (Python package manager)
* Tesseract OCR installed on your system
* MongoDB Atlas (NOTE : You need to configure the MongoDB Atlas and make the changes in .env file)

## Setup and Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/abhijeetsharan/PDF-OCR-Scanner.git
cd PDF-OCR-Scanner
```

### 2. Backend Setup:
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

### 3. Frontend Setup:
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Run the Application:
Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).

## Usage

1. **Upload a PDF**: Use the upload form to select a PDF file
2. **Extract Text**: View the extracted text in the interface
3. **Search Keywords**: Use the search bar to find specific words or phrases in the text
4. **Generate Summary**: Click the "Summarize" button to view a concise summary of the extracted text

## Project Structure

```
pdf-parsing-search/
|— backend/
|   |— app.py (Flask API for text extraction and summarization)
|   |— requirements.txt (Python dependencies)
|— frontend/
    |— src/
        |— components/
            |— UploadForm.jsx
            |— SearchBar.jsx
            |— SummaryButton.jsx
        |— App.jsx (Main application)
    |— package.json (Frontend dependencies)
```

## Future Enhancements

* PDF Preview: Display the uploaded document alongside extracted text
* Multi-language Support: Extend capabilities to support more languages
* Analytics Dashboard: Visualize document statistics and insights
* Named Entity Recognition (NER): Extract specific entities like names, dates, and places

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature additions or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements

* Tesseract OCR for text extraction
* Hugging Face Transformers for text summarization

## Contact

* **Author**: Abhijeet Sharan
* **GitHub**: [github.com/abhijeetsharan](https://github.com/abhijeetsharan)
* **LinkedIn**: [linkedin.com/in/abhijeetsharan1510](https://linkedin.com/in/abhijeetsharan1510)
