from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import pdfplumber
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
mongodb_uri = os.getenv("MONGODB_URI")

app = Flask(__name__)
CORS(app)  # To handle cross-origin requests for frontend

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

client = MongoClient(mongodb_uri)
db = client['pdf_database']
collection = db['documents']

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# OCR Func
def extract_text_from_image(pdf_path):
    images = convert_from_path(pdf_path)
    text = ""
    for image in images:
        text += pytesseract.image_to_string(image)
    return text

# PDF parsing func
def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text()
        return full_text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract text from PDF
        text = extract_text_from_pdf(file_path)

        # If no text is found, run OCR
        if not text:
            ocr_text = extract_text_from_image(file_path)
            text = ocr_text  # Use OCR text as the main text if PDF is scanned
        else:
            ocr_text = ""  # No OCR needed if text was extracted from PDF

        # Save document to database
        save_document_to_db(text, ocr_text)

        return jsonify({"text": text, "ocr_text": ocr_text}), 200
    else:
        return jsonify({'error': 'Invalid file type'}), 400

# Save document to DB
def save_document_to_db(text, ocr_text):
    collection.insert_one({"text": text, "ocr_text": ocr_text})

@app.route('/search', methods=['GET'])
def search_documents():
    query = request.args.get('query')
    if query:
        results = collection.find({"text": {"$regex": query, "$options": 'i'}})
        results_list = [{"text": result['text']} for result in results]
        return jsonify(results_list), 200
    return jsonify({"error": "No query provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
