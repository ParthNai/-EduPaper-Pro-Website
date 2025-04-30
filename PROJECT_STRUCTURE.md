# EduPaper Pro - Project Structure (Django)

```
📦 edupaper_pro/
├── 📂 edupaper_pro/                 # Main project directory
│   ├── settings.py                  # Project settings
│   ├── urls.py                      # Main URL configuration
│   └── wsgi.py                      # WSGI configuration
│
├── 📂 apps/                         # Django applications
│   ├── 📂 accounts/                 # User authentication and management
│   │   ├── models.py               # Custom user model
│   │   ├── forms.py                # Authentication forms
│   │   └── views.py                # Login, register, OTP views
│   │
│   ├── 📂 core/                    # Core functionality
│   │   ├── models.py               # Board, Medium, Standard models
│   │   └── views.py                # Core views
│   │
│   ├── 📂 questions/               # Question management
│   │   ├── models.py               # Question models
│   │   └── views.py                # Question views
│   │
│   └── 📂 assessment/              # Assessment and reports
│       ├── models.py               # Assessment models
│       └── views.py                # Assessment views
│
├── 📂 static/                       # Static files
│   ├── css/                        # Compiled CSS
│   ├── js/                         # JavaScript files
│   └── images/                     # Image assets
│
├── 📂 templates/                    # HTML templates
│   ├── 📂 base/                    # Base templates
│   ├── 📂 accounts/                # Auth templates
│   ├── 📂 dashboard/               # Dashboard templates
│   └── 📂 questions/               # Question templates
│
└── 📂 media/                       # User uploaded files
    ├── pdfs/                       # Study materials
    └── images/                     # User images

## Models Structure

```python
# accounts/models.py
class User(AbstractUser):
    ROLES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('institute', 'Institute')
    )
    role = models.CharField(max_length=10, choices=ROLES)
    phone = models.CharField(max_length=15)
    otp = models.CharField(max_length=6)

# core/models.py
class Board(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Medium(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

class Standard(models.Model):
    medium = models.ForeignKey(Medium, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

class Subject(models.Model):
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    content = models.TextField()
    pdf_material = models.FileField(upload_to='pdfs/study_material/')

# questions/models.py
class Question(models.Model):
    TYPES = (
        ('mcq', 'Multiple Choice'),
        ('fill', 'Fill in the Blanks'),
        ('tf', 'True/False'),
        ('match', 'Match the Following')
    )
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    type = models.CharField(max_length=5, choices=TYPES)
    content = models.JSONField()
    difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Medium'), (3, 'Hard')])

# assessment/models.py
class DPP(models.Model):
    title = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)
    created_at = models.DateTimeField(auto_now_add=True)
    pdf_file = models.FileField(upload_to='pdfs/dpp/')
```

## Key Features and Views

### Authentication System
- Custom user model with role-based permissions
- OTP verification using SMS/Email
- Session-based authentication

### Dashboard Views
- Role-specific dashboards
- Progress tracking for students
- Analytics for teachers/institutes

### Question Management
- CRUD operations for questions
- Question bank filtering and search
- Bulk question import/export

### Assessment System
- DPP generation with customizable templates
- Online exam creation and management
- Result generation and analysis

### PDF Generation
- Study material PDF viewer
- DPP PDF generation with solutions
- Report generation in PDF format

## URL Structure
```python
urlpatterns = [
    # Authentication URLs
    path('accounts/login/', views.LoginView.as_view()),
    path('accounts/register/', views.RegisterView.as_view()),
    path('accounts/verify-otp/', views.OTPVerifyView.as_view()),

    # Dashboard URLs
    path('dashboard/', views.DashboardView.as_view()),
    path('boards/', views.BoardListView.as_view()),
    path('subjects/<int:board_id>/', views.SubjectListView.as_view()),

    # Question URLs
    path('questions/', views.QuestionListView.as_view()),
    path('questions/create/', views.QuestionCreateView.as_view()),
    path('questions/<int:pk>/', views.QuestionDetailView.as_view()),

    # Assessment URLs
    path('dpp/create/', views.DPPCreateView.as_view()),
    path('dpp/<int:pk>/', views.DPPDetailView.as_view()),
    path('reports/', views.ReportListView.as_view()),
]
```

## Template Structure
- Base template with common layout
- Role-specific dashboard templates
- Question type-specific templates
- PDF generation templates

## Static Files
- Tailwind CSS for styling
- Custom JavaScript for interactive features
- PDF.js for PDF viewing
- Alpine.js for reactive components
