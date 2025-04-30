# EduPaper Pro

A comprehensive educational platform that facilitates learning and assessment for students, teachers, and educational institutes.

## Features

### User Roles
- Student
- Teacher
- Institute

### Core Functionality
1. Role-based Authentication with OTP verification
2. Education Board Selection
3. Language Medium Selection
4. Standard/Grade Selection
5. Subject and Sub-subject Navigation
6. Chapter-wise Content Organization

### Student Features
- Access to various question types:
  - MCQ
  - Fill in the blanks
  - True/False
  - Match the following
- Topic-wise question access
- Online exam participation
- PDF content reading

### Teacher/Institute Features
- Result/Report generation
- PDF creation for Daily Practice Problems (DPP)
- Question selection options:
  - Random questions
  - One-to-one mapping
  - Specific question selection

## Tech Stack
- Python 3.11+
- Django 5.0
- PostgreSQL
- Tailwind CSS
- Alpine.js for interactivity
- WeasyPrint for PDF generation

## Prerequisites
1. Python 3.11 or higher
2. PostgreSQL database
3. Virtual environment (recommended)

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database and other settings
   ```
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
7. Run the development server:
   ```bash
   python manage.py runserver
   ```

Visit http://127.0.0.1:8000/ to access the application.
