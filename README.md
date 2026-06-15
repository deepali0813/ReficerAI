#ReficerAI 🚀

## Team Name

ModelMinds

## Team Members

* Deepali Garg
* Charu Pal

# Project Overview

ReficerAI is an AI-powered multilingual product diagnostics platform that transforms traditional product manuals into intelligent conversational assistants.

Instead of searching through lengthy manuals, users can simply ask questions in natural language. ReficerAI retrieves relevant information from product-specific documentation using Ambient Retrieval and Retrieval-Augmented Generation (RAG), then provides accurate troubleshooting guidance through an AI-powered diagnostic assistant.

The platform enables companies to upload product manuals and automatically convert them into searchable knowledge bases, making customer support faster, smarter, and more accessible.

---

# Problem Statement

Users often struggle to find relevant troubleshooting information in lengthy product manuals. Traditional support systems are slow, difficult to scale, and frequently unable to provide context-aware assistance.

ReficerAI addresses this challenge by converting static product documentation into an intelligent, multilingual AI support system.

---

# Features and Functionality

## 🤖 AI Diagnostic Assistant

Provides intelligent troubleshooting guidance using product-specific documentation and AI reasoning.

## 🧠 Ambient Retrieval

Analyzes the entire conversation context instead of relying solely on the user's latest message, enabling more accurate retrieval and diagnosis.

## 📚 Product-Specific Knowledge Base

Each uploaded product receives its own dedicated Moss index, ensuring responses are based on the correct product documentation.

## 📄 PDF-to-Knowledge Pipeline

Automatically:

* Uploads product manuals
* Extracts text from PDFs
* Chunks documents
* Generates Moss indexes
* Stores knowledge for retrieval

## 🌍 Multilingual Support

Allows users to communicate with the AI assistant in multiple languages.

## 💬 Context-Aware Conversations

Maintains conversation history for follow-up questions and multi-step troubleshooting sessions.

## 🏢 Company Dashboard

Companies can:

* Add products
* Upload product manuals
* Manage knowledge bases
* Maintain product information

## 👤 User Dashboard

Users can:

* Browse products
* View product details
* Chat with the AI assistant
* Receive troubleshooting support

---

# Tech Stack Used

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* FastAPI
* Python

## Database

* MongoDB

## AI & Retrieval

* Google Gemini
* Moss Vector Search

## Document Processing

* PyMuPDF (fitz)

## Version Control

* Git
* GitHub

---

# System Architecture

## Product Onboarding Workflow

Company Uploads Product
↓
Upload Product Manual (PDF)
↓
PDF Text Extraction
↓
Document Chunking
↓
Moss Index Creation
↓
mossIndexId Stored in MongoDB
↓
Knowledge Base Ready

## AI Diagnostic Workflow

User Selects Product
↓
User Query
↓
Ambient Retrieval Query Generation
↓
Product-Specific Moss Retrieval
↓
Relevant Documentation Retrieved
↓
AI Diagnostic Agent
↓
Response Generation
↓
User Receives Answer

---

### Core Innovations

* Ambient Retrieval for improved context understanding
* Product-Specific Retrieval-Augmented Generation (RAG)
* Automated PDF-to-Knowledge-Base conversion
* Multilingual AI diagnostics
* Context-aware troubleshooting conversations

# Setup and Installation Instructions

## Clone Repository

```bash
git clone <repository-url>
cd ReficerAI
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn api_server:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

## Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
MOSS_PROJECT_ID=your_project_id
MOSS_PROJECT_KEY=your_project_key
```

---

# Usage Guide

### For Companies

1. Login to the company dashboard.
2. Add a new product.
3. Upload the product manual (PDF).
4. The system automatically generates a Moss knowledge index.
5. Product becomes available for AI-powered support.

### For Users

1. Open the user dashboard.
2. Select a product.
3. Start chatting with ReficerAI.
4. Receive troubleshooting assistance based on official documentation.

---

# Demo Video

Demo Video Link:
[Paste YouTube / Drive Link Here]

---

# Future Enhancements

* Voice-based diagnostics
* Image-based issue detection

---

### Impact

ReficerAI reduces the effort required to search through product manuals while improving customer support efficiency and accessibility through AI-powered assistance.
