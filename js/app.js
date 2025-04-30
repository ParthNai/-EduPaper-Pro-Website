// DOM Elements
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const adminLoginBtn = document.querySelector('#adminLoginBtn');
const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminDashboard = document.getElementById('adminDashboard');
const dashboard = document.getElementById('dashboard');
const userRoleSpan = document.getElementById('userRole');
const boardSelect = document.getElementById('boardSelect');
const mediumSelect = document.getElementById('mediumSelect');
const standardSelect = document.getElementById('standardSelect');
const subjectList = document.getElementById('subjectList');
const chapterList = document.getElementById('chapterList');
const questionArea = document.getElementById('questionArea');
const loginOtpForm = document.getElementById('loginOtpForm');
const registrationOtpForm = document.getElementById('registrationOtpForm');
const registrationPasswordForm = document.getElementById('registrationPasswordForm');

// Mock Data
const mockData = {
    standards: {
        'cbse': ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'],
        'state': ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
        'icse': ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
    },
    subjects: {
        'cbse': ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
        'state': ['Mathematics', 'Science', 'English', 'Social Studies', 'Regional Language'],
        'icse': ['Mathematics', 'Science', 'English', 'History & Civics', 'Geography']
    },
    chapters: {
        'Mathematics': ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
        'Science': ['Physics', 'Chemistry', 'Biology'],
        'English': ['Grammar', 'Literature', 'Writing Skills']
    }
};

// Get all sections for visibility management
const allSections = [
    loginForm,
    registrationForm,
    adminLoginForm,
    dashboard,
    adminDashboard
];

// Store user data during registration
let registrationData = {};

// Function to show a specific section
function showSection(section) {
    // Hide all sections first
    allSections.forEach(s => {
        if (s) {
            s.style.opacity = '0';
            s.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                s.classList.add('hidden');
            }, 300);
        }
    });

    // Show target section
    if (section) {
        setTimeout(() => {
            section.classList.remove('hidden');
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 300);
    }
}

// Function to show error message
function showError(submitBtn, message) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit';
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'text-red-500 text-sm mt-2 flex items-center';
    errorMsg.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        ${message}
    `;
    submitBtn.parentElement.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 3000);
}

// Function to show success message
function showSuccess(submitBtn, message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'text-green-500 text-sm mt-2 flex items-center';
    successMsg.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        ${message}
    `;
    submitBtn.parentElement.appendChild(successMsg);
    return successMsg;
}

// Password validation
function validatePassword(password) {
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    document.getElementById('lengthCheck').textContent = 
        `${checks.length ? '✓' : '✗'} At least 8 characters`;
    document.getElementById('upperCheck').textContent = 
        `${checks.upper ? '✓' : '✗'} One uppercase letter`;
    document.getElementById('lowerCheck').textContent = 
        `${checks.lower ? '✓' : '✗'} One lowercase letter`;
    document.getElementById('numberCheck').textContent = 
        `${checks.number ? '✓' : '✗'} One number`;
    document.getElementById('specialCheck').textContent = 
        `${checks.special ? '✓' : '✗'} One special character`;

    return Object.values(checks).every(check => check);
}

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    });
});

// Handle registration form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const mobile = document.getElementById('regMobile').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const role = document.getElementById('regRole').value;
    const terms = document.getElementById('regTerms').checked;

    // Validate password
    if (!validatePassword(password)) {
        alert('Please ensure your password meets all requirements');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check terms acceptance
    if (!terms) {
        alert('Please accept the Terms and Conditions');
        return;
    }

    try {
        // Here you would typically make an API call to register the user
        // For demo purposes, we'll simulate a successful registration
        console.log('Registration successful:', {
            name: `${firstName} ${lastName}`,
            mobile,
            email,
            role
        });

        alert('Registration successful! Please login.');
        showSection(loginForm);
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const mobile = document.getElementById('loginMobile').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    try {
        // Here you would typically make an API call to authenticate the user
        // For demo purposes, we'll simulate a successful login
        console.log('Login successful:', { mobile, role });

        // Show the main content area
        showSection(document.getElementById('mainContent'));
        
        // Initialize dashboard with user data
        initializeDashboard(role, {
            firstName: 'John',
            lastName: 'Doe',
            mobile: mobile,
            role: role
        });
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
});

// Button click handlers
document.getElementById('loginBtn')?.addEventListener('click', () => showSection(loginForm));
document.getElementById('registerBtn')?.addEventListener('click', () => showSection(registrationForm));
document.getElementById('adminBtn')?.addEventListener('click', () => showSection(adminLoginForm));

// Show login form by default
showSection(loginForm);

// Board Selection
boardSelect.addEventListener('change', () => {
    const selectedBoard = boardSelect.value;
    if (selectedBoard) {
        mediumSelect.disabled = false;
        updateStandards(selectedBoard);
    } else {
        mediumSelect.disabled = true;
        standardSelect.disabled = true;
    }
});

// Medium Selection
mediumSelect.addEventListener('change', () => {
    const selectedMedium = mediumSelect.value;
    if (selectedMedium) {
        standardSelect.disabled = false;
    } else {
        standardSelect.disabled = true;
    }
});

// Standard Selection
standardSelect.addEventListener('change', () => {
    const selectedStandard = standardSelect.value;
    if (selectedStandard) {
        showSubjects(boardSelect.value);
    }
});

// Functions
function setupDashboard(role) {
    // Add staggered animation to grid items
    const gridItems = dashboard.querySelectorAll('.grid > div');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Role-specific setup
    if (role === 'student') {
        setupStudentDashboard();
    } else {
        setupTeacherDashboard();
    }
}

function updateStandards(board) {
    standardSelect.innerHTML = '<option value="">Select Standard</option>';
    mockData.standards[board].forEach(standard => {
        const option = document.createElement('option');
        option.value = standard.toLowerCase();
        option.textContent = standard;
        standardSelect.appendChild(option);
    });
}

function showSubjects(board) {
    subjectList.innerHTML = '';
    subjectList.classList.remove('hidden');
    
    // Add staggered animation to subject cards
    mockData.subjects[board].forEach((subject, index) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-300';
        subjectCard.style.opacity = '0';
        subjectCard.style.transform = 'translateX(-20px)';
        subjectCard.innerHTML = `
            <h3 class="font-bold mb-2">${subject}</h3>
            <p class="text-sm text-gray-600">Click to view chapters</p>
        `;
        
        subjectList.appendChild(subjectCard);
        
        setTimeout(() => {
            subjectCard.style.opacity = '1';
            subjectCard.style.transform = 'translateX(0)';
        }, index * 100);
        
        subjectCard.addEventListener('click', () => showChapters(subject));
    });
}

function showChapters(subject) {
    chapterList.innerHTML = '';
    chapterList.classList.remove('hidden');
    subjectList.classList.add('hidden');

    const backButton = document.createElement('button');
    backButton.className = 'mb-4 text-blue-600 hover:text-blue-800';
    backButton.innerHTML = '← Back to Subjects';
    backButton.addEventListener('click', () => {
        chapterList.classList.add('hidden');
        subjectList.classList.remove('hidden');
    });
    chapterList.appendChild(backButton);

    const chapters = mockData.chapters[subject] || [];
    chapters.forEach((chapter, index) => {
        const chapterCard = document.createElement('div');
        chapterCard.className = 'bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-lg transition-all duration-300';
        chapterCard.style.opacity = '0';
        chapterCard.style.transform = 'translateX(-20px)';
        chapterCard.innerHTML = `
            <h3 class="font-bold mb-2">${chapter}</h3>
            <p class="text-sm text-gray-600">Click to practice questions</p>
        `;
        
        chapterList.appendChild(chapterCard);
        
        setTimeout(() => {
            chapterCard.style.opacity = '1';
            chapterCard.style.transform = 'translateX(0)';
        }, index * 100);
        
        chapterCard.addEventListener('click', () => showQuestions(subject, chapter));
    });
}

function showQuestions(subject, chapter) {
    const questions = Questions.database[subject]?.[chapter] || [];
    if (questions.length === 0) {
        alert('No questions available for this chapter yet.');
        return;
    }

    chapterList.classList.add('hidden');
    questionArea.classList.remove('hidden');

    // Create question navigation
    const questionNav = document.createElement('div');
    questionNav.className = 'mb-6';
    questionNav.innerHTML = `
        <button class="back-btn mb-4 text-blue-600 hover:text-blue-800">← Back to Chapters</button>
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">${chapter} - Practice Questions</h2>
            <div class="flex space-x-2">
                <button class="prev-btn px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" disabled>Previous</button>
                <span class="question-counter px-3 py-1 bg-gray-100 rounded"></span>
                <button class="next-btn px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">Next</button>
            </div>
        </div>
    `;

    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container mt-4';

    questionArea.innerHTML = '';
    questionArea.appendChild(questionNav);
    questionArea.appendChild(questionContainer);

    // Set up navigation
    let currentQuestionIndex = 0;
    const backBtn = questionNav.querySelector('.back-btn');
    const prevBtn = questionNav.querySelector('.prev-btn');
    const nextBtn = questionNav.querySelector('.next-btn');
    const counter = questionNav.querySelector('.question-counter');

    function updateQuestion() {
        counter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
        Questions.render(questions[currentQuestionIndex], questionContainer);
    }

    backBtn.addEventListener('click', () => {
        questionArea.classList.add('hidden');
        chapterList.classList.remove('hidden');
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            updateQuestion();
        }
    });

    updateQuestion();
}

function setupStudentDashboard() {
    // Student-specific features
    questionArea.innerHTML = `
        <div class="mb-4">
            <h3 class="font-bold mb-2">Practice Questions</h3>
            <div class="space-y-4">
                <!-- Question types will be dynamically loaded here -->
            </div>
        </div>
    `;
}

function setupTeacherDashboard() {
    questionArea.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Column: Question Management -->
            <div id="questionManagement"></div>
            
            <!-- Right Column: Reports -->
            <div id="reportsManagement"></div>
        </div>
    `;

    // Initialize teacher interface
    TeacherInterface.init(document.getElementById('questionManagement'));
    ReportsInterface.init(document.getElementById('reportsManagement'));
}

// Initialize dashboard
function initializeDashboard(role, userData) {
    // Update user display
    document.getElementById('userNameDisplay').textContent = `${userData.firstName} ${userData.lastName}`;

    // Setup navigation based on role
    const mainNav = document.getElementById('mainNav');
    const navItems = getNavItemsByRole(role);
    mainNav.innerHTML = navItems.map(item => `
        <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" data-section="${item.id}">
            ${item.label}
        </a>
    `).join('');

    // Setup user profile dropdown
    const userProfileBtn = document.querySelector('#userProfileDropdown button');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    
    userProfileBtn.addEventListener('click', () => {
        userDropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userProfileBtn.contains(e.target)) {
            userDropdownMenu.classList.add('hidden');
        }
    });

    // Handle logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        showSection(loginForm);
    });

    // Initialize board selection handlers
    initializeBoardSelections();

    // Show role-specific content
    showRoleSpecificContent(role);
}

// Get navigation items based on role
function getNavItemsByRole(role) {
    const navItems = {
        student: [
            { id: 'studyMaterial', label: 'Study Material' },
            { id: 'practice', label: 'Practice' },
            { id: 'exams', label: 'Exams' },
            { id: 'results', label: 'Results' }
        ],
        teacher: [
            { id: 'manageContent', label: 'Manage Content' },
            { id: 'createTests', label: 'Create Tests' },
            { id: 'viewReports', label: 'View Reports' },
            { id: 'dppGenerator', label: 'DPP Generator' }
        ],
        admin: [
            { id: 'manageUsers', label: 'Manage Users' },
            { id: 'contentLibrary', label: 'Content Library' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'settings', label: 'Settings' }
        ]
    };
    return navItems[role] || [];
}

// Initialize board, medium, standard selections
function initializeBoardSelections() {
    const boardSelect = document.getElementById('boardSelect');
    const mediumSelect = document.getElementById('mediumSelect');
    const standardSelect = document.getElementById('standardSelect');
    const subjectsList = document.getElementById('subjectsList');

    // Board selection handler
    boardSelect.addEventListener('change', () => {
        const board = boardSelect.value;
        if (board) {
            // Enable medium selection
            mediumSelect.disabled = false;
            updateStandards(board);
        } else {
            mediumSelect.disabled = true;
            standardSelect.disabled = true;
        }
    });

    // Medium selection handler
    mediumSelect.addEventListener('change', () => {
        const medium = mediumSelect.value;
        if (medium) {
            standardSelect.disabled = false;
        } else {
            standardSelect.disabled = true;
        }
    });

    // Standard selection handler
    standardSelect.addEventListener('change', () => {
        const standard = standardSelect.value;
        if (standard) {
            updateSubjects(boardSelect.value, mediumSelect.value, standard);
        } else {
            clearSubjects();
        }
    });
}

// Update standards based on board selection
function updateStandards(board) {
    const standardSelect = document.getElementById('standardSelect');
    const standards = getStandardsByBoard(board);
    
    standardSelect.innerHTML = `
        <option value="">Select Standard</option>
        ${standards.map(std => `<option value="${std}">${std}</option>`).join('')}
    `;
}

// Get standards by board
function getStandardsByBoard(board) {
    const standards = {
        'CBSE': ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
        'ICSE': ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
        'StateBoard': ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
    };
    return standards[board] || [];
}

// Update subjects based on selections
function updateSubjects(board, medium, standard) {
    const subjectsList = document.getElementById('subjectsList');
    const subjects = getSubjectsByStandard(board, standard);
    
    subjectsList.innerHTML = subjects.map(subject => `
        <div class="flex items-center space-x-2">
            <input type="checkbox" id="subject_${subject.id}" class="form-checkbox">
            <label for="subject_${subject.id}" class="text-sm text-gray-700">${subject.name}</label>
        </div>
    `).join('');
}

// Get subjects by standard
function getSubjectsByStandard(board, standard) {
    // This would typically come from an API
    return [
        { id: 'math', name: 'Mathematics' },
        { id: 'science', name: 'Science' },
        { id: 'english', name: 'English' },
        { id: 'social', name: 'Social Studies' }
    ];
}

// Clear subjects list
function clearSubjects() {
    document.getElementById('subjectsList').innerHTML = '';
}

// Show role-specific content
function showRoleSpecificContent(role) {
    const dynamicContent = document.getElementById('dynamicContent');
    
    // Clear existing content
    dynamicContent.innerHTML = '';
    
    // Add role-specific content
    switch (role) {
        case 'student':
            addStudentContent(dynamicContent);
            break;
        case 'teacher':
            addTeacherContent(dynamicContent);
            break;
        case 'admin':
            addAdminContent(dynamicContent);
            break;
    }
}

// Add student-specific content
function addStudentContent(container) {
    container.innerHTML = `
        <div class="min-h-screen bg-gray-50">
            <div class="min-h-screen p-8 max-w-7xl mx-auto">
                <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">Welcome to EduPaper Pro</h1>
                <p class="text-lg text-gray-600 mb-12 text-center">Select a board and subject to get started</p>
                
                <!-- Main Features Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                    <!-- Test Papers -->
                    <div class="bg-blue-600 rounded-3xl p-6 text-white hover:bg-blue-700 transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl">
                        <h3 class="text-xl font-bold mb-6">Test Papers</h3>
                        <div class="text-base space-y-6 flex-grow flex flex-col justify-center">
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Latest Test Papers
                            </div>
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Timed Tests
                            </div>
                        </div>
                        <button class="w-full bg-white text-blue-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all">
                            View All Papers
                        </button>
                    </div>

                    <!-- Previous Year Papers -->
                    <div class="bg-purple-600 rounded-3xl p-6 text-white hover:bg-purple-700 transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl">
                        <h3 class="text-xl font-bold mb-6">Previous Year</h3>
                        <div class="text-base space-y-6 flex-grow flex flex-col justify-center">
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                With Solutions
                            </div>
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Year-wise Papers
                            </div>
                        </div>
                        <button class="w-full bg-white text-purple-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all">
                            Browse Papers
                        </button>
                    </div>

                    <!-- Paper Generator -->
                    <div class="bg-green-600 rounded-3xl p-6 text-white hover:bg-green-700 transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl">
                        <h3 class="text-xl font-bold mb-6">Paper Generator</h3>
                        <div class="text-base space-y-6 flex-grow flex flex-col justify-center">
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-1" />
                                </svg>
                                Custom Papers
                            </div>
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Auto Generate
                            </div>
                        </div>
                        <button class="w-full bg-white text-green-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-green-50 transform hover:scale-105 transition-all">
                            Generate Paper
                        </button>
                    </div>
                </div>

                <!-- Secondary Features -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <!-- Study Materials -->
                    <div class="bg-red-600 rounded-3xl p-6 text-white hover:bg-red-700 transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl">
                        <h3 class="text-xl font-bold mb-6">Study Materials</h3>
                        <div class="text-base space-y-6 flex-grow flex flex-col justify-center">
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Chapter Notes
                            </div>
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Video Lectures
                            </div>
                        </div>
                        <button class="w-full bg-white text-red-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-red-50 transform hover:scale-105 transition-all">
                            Access Materials
                        </button>
                    </div>

                    <!-- Performance Analytics -->
                    <div class="bg-indigo-600 rounded-3xl p-6 text-white hover:bg-indigo-700 transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl">
                        <h3 class="text-xl font-bold mb-6">Performance</h3>
                        <div class="text-base space-y-6 flex-grow flex flex-col justify-center">
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Progress Report
                            </div>
                            <div class="flex items-center transform hover:translate-x-2 transition-transform">
                                <svg class="h-7 w-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Performance Stats
                            </div>
                        </div>
                        <button class="w-full bg-white text-indigo-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all">
                            View Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for buttons and card clicks
    container.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = e.target.textContent.trim();
            console.log(`Button clicked: ${action}`);
            alert(`${action} feature coming soon!`);
        });
    });

    // Add click handlers for the entire cards
    container.querySelectorAll('.cursor-pointer').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            const title = card.querySelector('h3').textContent.trim();
            console.log(`Card clicked: ${title}`);
            alert(`Opening ${title} section...`);
        });
    });
}

// Add teacher-specific content
function addTeacherContent(container) {
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-4">
                <button class="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <h4 class="font-medium text-gray-900">Create New Test</h4>
                    <p class="text-sm text-gray-500">Design and schedule tests</p>
                </button>
                <button class="p-4 border rounded-lg text-left hover:bg-gray-50">
                    <h4 class="font-medium text-gray-900">Generate DPP</h4>
                    <p class="text-sm text-gray-500">Create daily practice problems</p>
                </button>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Submissions</h3>
            <div class="space-y-4">
                <!-- Add submission items -->
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Class Performance</h3>
            <div class="space-y-4">
                <!-- Add performance metrics -->
            </div>
        </div>
    `;
}

// Add admin-specific content
function addAdminContent(container) {
    container.innerHTML = `
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">System Overview</h3>
            <!-- Add system stats -->
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">User Management</h3>
            <!-- Add user management tools -->
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Content Statistics</h3>
            <!-- Add content stats -->
        </div>
    `;
}

// Mobile menu functionality
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Handle PWA display
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Show the install prompt when user clicks a button
    document.getElementById('installBtn')?.addEventListener('click', () => {
        e.prompt();
        e.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
        });
    });
});

// Add touch event handlers for better mobile experience
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'scale(1)';
    });
});

// Handle offline functionality
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

// Add Electron integration
const { ipcRenderer } = require('electron');

// Modify file download handling
function downloadPDF(url) {
    ipcRenderer.send('download-file', url);
}

// Modify PDF preview handling
function previewPDF(path) {
    ipcRenderer.send('preview-pdf', path);
}

// Handle window controls
document.addEventListener('DOMContentLoaded', () => {
    const minimizeBtn = document.getElementById('minimize-btn');
    const maximizeBtn = document.getElementById('maximize-btn');
    const closeBtn = document.getElementById('close-btn');

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            ipcRenderer.send('minimize-window');
        });
    }

    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            ipcRenderer.send('toggle-maximize-window');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            ipcRenderer.send('close-window');
        });
    }
});

// Handle offline/online state for desktop
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    // Sync data with server when back online
    syncData();
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    // Save current state to local storage
    saveCurrentState();
});

function syncData() {
    // Implement data synchronization
    console.log('Syncing data with server...');
}

function saveCurrentState() {
    // Save current app state to local storage
    const currentState = {
        // Add relevant state data
    };
    localStorage.setItem('appState', JSON.stringify(currentState));
}
