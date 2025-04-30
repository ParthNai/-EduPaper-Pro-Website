// Reports Module
const ReportsInterface = {
    // Mock data for demonstration
    mockData: {
        studentPerformance: {
            'Student 1': {
                totalAttempted: 150,
                correct: 120,
                subjects: {
                    'Mathematics': { attempted: 50, correct: 45 },
                    'Science': { attempted: 60, correct: 45 },
                    'English': { attempted: 40, correct: 30 }
                },
                timeline: [
                    { date: '2025-04-01', score: 85 },
                    { date: '2025-04-15', score: 90 },
                    { date: '2025-04-30', score: 88 }
                ]
            },
            'Student 2': {
                totalAttempted: 120,
                correct: 90,
                subjects: {
                    'Mathematics': { attempted: 40, correct: 35 },
                    'Science': { attempted: 50, correct: 35 },
                    'English': { attempted: 30, correct: 20 }
                },
                timeline: [
                    { date: '2025-04-01', score: 75 },
                    { date: '2025-04-15', score: 80 },
                    { date: '2025-04-30', score: 82 }
                ]
            }
        },
        questionAnalytics: {
            'Mathematics': {
                'Algebra': {
                    totalAttempts: 500,
                    averageScore: 75,
                    difficultyDistribution: {
                        easy: 40,
                        medium: 35,
                        hard: 25
                    },
                    commonMistakes: [
                        'Sign errors in equations',
                        'Incorrect factorization',
                        'Wrong order of operations'
                    ]
                }
            },
            'Science': {
                'Physics': {
                    totalAttempts: 450,
                    averageScore: 70,
                    difficultyDistribution: {
                        easy: 45,
                        medium: 30,
                        hard: 25
                    },
                    commonMistakes: [
                        'Unit conversion errors',
                        'Formula application mistakes',
                        'Conceptual misunderstandings'
                    ]
                }
            }
        }
    },

    // Initialize reports interface
    init(container) {
        this.container = container;
        this.setupReportsInterface();
    },

    // Set up the main reports interface
    setupReportsInterface() {
        this.container.innerHTML = `
            <div class="reports-container">
                <!-- Report Type Selection -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4">Generate Reports</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button class="report-btn p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                data-report="student">
                            Student Performance Report
                        </button>
                        <button class="report-btn p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                data-report="question">
                            Question Analytics Report
                        </button>
                        <button class="report-btn p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                data-report="class">
                            Class Progress Report
                        </button>
                    </div>
                </div>

                <!-- Report Configuration -->
                <div id="reportConfig" class="hidden mb-6">
                    <!-- Configuration options will be dynamically loaded -->
                </div>

                <!-- Report Display -->
                <div id="reportDisplay" class="hidden">
                    <!-- Report content will be dynamically loaded -->
                </div>
            </div>
        `;

        this.setupEventListeners();
    },

    // Set up event listeners
    setupEventListeners() {
        const reportBtns = this.container.querySelectorAll('.report-btn');
        reportBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const reportType = btn.dataset.report;
                this.showReportConfig(reportType);
            });
        });
    },

    // Show configuration options for selected report type
    showReportConfig(reportType) {
        const configDiv = this.container.querySelector('#reportConfig');
        configDiv.classList.remove('hidden');
        
        switch(reportType) {
            case 'student':
                configDiv.innerHTML = this.getStudentReportConfig();
                break;
            case 'question':
                configDiv.innerHTML = this.getQuestionReportConfig();
                break;
            case 'class':
                configDiv.innerHTML = this.getClassReportConfig();
                break;
        }

        // Add generate button event listener
        const generateBtn = configDiv.querySelector('.generate-report');
        generateBtn.addEventListener('click', () => this.generateReport(reportType));
    },

    // Configuration templates
    getStudentReportConfig() {
        return `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-4">Student Performance Report Configuration</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Student</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Students</option>
                            <option value="student1">Student 1</option>
                            <option value="student2">Student 2</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Time Period</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="quarter">Last Quarter</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Subjects</option>
                            <option value="math">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="english">English</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Report Format</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="detailed">Detailed Report</option>
                            <option value="summary">Summary Report</option>
                            <option value="analytics">Analytics Report</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="generate-report bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Generate Report
                    </button>
                </div>
            </div>
        `;
    },

    getQuestionReportConfig() {
        return `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-4">Question Analytics Report Configuration</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Subjects</option>
                            <option value="math">Mathematics</option>
                            <option value="science">Science</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Chapter</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Chapters</option>
                            <option value="algebra">Algebra</option>
                            <option value="physics">Physics</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Levels</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Analysis Type</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="performance">Performance Analysis</option>
                            <option value="difficulty">Difficulty Analysis</option>
                            <option value="mistakes">Common Mistakes</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="generate-report bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Generate Report
                    </button>
                </div>
            </div>
        `;
    },

    getClassReportConfig() {
        return `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-4">Class Progress Report Configuration</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Class</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Classes</option>
                            <option value="class10">Class 10</option>
                            <option value="class11">Class 11</option>
                            <option value="class12">Class 12</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Section</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="all">All Sections</option>
                            <option value="a">Section A</option>
                            <option value="b">Section B</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Time Period</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="month">Last Month</option>
                            <option value="quarter">Last Quarter</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Report Type</label>
                        <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="progress">Progress Report</option>
                            <option value="comparison">Class Comparison</option>
                            <option value="improvement">Improvement Areas</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="generate-report bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                        Generate Report
                    </button>
                </div>
            </div>
        `;
    },

    // Generate the selected report
    generateReport(reportType) {
        const displayDiv = this.container.querySelector('#reportDisplay');
        displayDiv.classList.remove('hidden');

        switch(reportType) {
            case 'student':
                this.generateStudentReport(displayDiv);
                break;
            case 'question':
                this.generateQuestionReport(displayDiv);
                break;
            case 'class':
                this.generateClassReport(displayDiv);
                break;
        }

        // Add export button
        const exportBtn = document.createElement('button');
        exportBtn.className = 'mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700';
        exportBtn.innerHTML = 'Export as PDF';
        exportBtn.addEventListener('click', () => {
            const config = this.getReportConfig(reportType);
            PDFExport.generatePDF(displayDiv, reportType, config);
        });
        displayDiv.appendChild(exportBtn);
    },

    // Get report configuration
    getReportConfig(reportType) {
        const config = {};
        const configDiv = this.container.querySelector('#reportConfig');
        
        switch(reportType) {
            case 'student':
                config.student = configDiv.querySelector('select:nth-child(1)').value;
                config.timePeriod = configDiv.querySelector('select:nth-child(2)').value;
                config.subject = configDiv.querySelector('select:nth-child(3)').value;
                config.format = configDiv.querySelector('select:nth-child(4)').value;
                break;
            case 'question':
                config.subject = configDiv.querySelector('select:nth-child(1)').value;
                config.chapter = configDiv.querySelector('select:nth-child(2)').value;
                config.difficulty = configDiv.querySelector('select:nth-child(3)').value;
                config.analysisType = configDiv.querySelector('select:nth-child(4)').value;
                break;
            case 'class':
                config.class = configDiv.querySelector('select:nth-child(1)').value;
                config.section = configDiv.querySelector('select:nth-child(2)').value;
                config.timePeriod = configDiv.querySelector('select:nth-child(3)').value;
                config.reportType = configDiv.querySelector('select:nth-child(4)').value;
                break;
        }
        
        return config;
    },

    // Generate specific report types
    generateStudentReport(container) {
        const data = this.mockData.studentPerformance['Student 1'];
        container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-6">Student Performance Report</h4>
                
                <!-- Overall Performance -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Overall Performance</h5>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">
                                ${Math.round(data.correct/data.totalAttempted * 100)}%
                            </div>
                            <div class="text-sm text-gray-600">Overall Accuracy</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">${data.totalAttempted}</div>
                            <div class="text-sm text-gray-600">Questions Attempted</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600">${data.correct}</div>
                            <div class="text-sm text-gray-600">Correct Answers</div>
                        </div>
                    </div>
                </div>

                <!-- Subject-wise Performance -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Subject-wise Performance</h5>
                    <div class="space-y-4">
                        ${Object.entries(data.subjects).map(([subject, stats]) => `
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold">${subject}</span>
                                    <span class="text-blue-600 font-bold">
                                        ${Math.round(stats.correct/stats.attempted * 100)}%
                                    </span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-blue-600 h-2.5 rounded-full" 
                                         style="width: ${Math.round(stats.correct/stats.attempted * 100)}%">
                                    </div>
                                </div>
                                <div class="text-sm text-gray-600 mt-1">
                                    ${stats.correct} correct out of ${stats.attempted} attempted
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Progress Timeline -->
                <div>
                    <h5 class="font-bold mb-2">Progress Timeline</h5>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="space-y-2">
                            ${data.timeline.map(entry => `
                                <div class="flex justify-between items-center">
                                    <span>${entry.date}</span>
                                    <span class="font-bold">${entry.score}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateQuestionReport(container) {
        const data = this.mockData.questionAnalytics['Mathematics']['Algebra'];
        container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-6">Question Analytics Report</h4>
                
                <!-- Overall Statistics -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Overall Statistics</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">${data.totalAttempts}</div>
                            <div class="text-sm text-gray-600">Total Attempts</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">${data.averageScore}%</div>
                            <div class="text-sm text-gray-600">Average Score</div>
                        </div>
                    </div>
                </div>

                <!-- Difficulty Distribution -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Difficulty Distribution</h5>
                    <div class="space-y-4">
                        ${Object.entries(data.difficultyDistribution).map(([level, percentage]) => `
                            <div>
                                <div class="flex justify-between items-center mb-1">
                                    <span class="capitalize">${level}</span>
                                    <span>${percentage}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-${level === 'easy' ? 'green' : level === 'medium' ? 'yellow' : 'red'}-600 h-2.5 rounded-full" 
                                         style="width: ${percentage}%">
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Common Mistakes -->
                <div>
                    <h5 class="font-bold mb-2">Common Mistakes</h5>
                    <div class="bg-red-50 p-4 rounded-lg">
                        <ul class="list-disc list-inside space-y-2">
                            ${data.commonMistakes.map(mistake => `
                                <li class="text-red-600">${mistake}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    generateClassReport(container) {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h4 class="font-bold mb-6">Class Progress Report</h4>
                
                <!-- Class Overview -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Class Overview</h5>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">85%</div>
                            <div class="text-sm text-gray-600">Average Performance</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">92%</div>
                            <div class="text-sm text-gray-600">Attendance Rate</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600">78%</div>
                            <div class="text-sm text-gray-600">Assignment Completion</div>
                        </div>
                    </div>
                </div>

                <!-- Performance Distribution -->
                <div class="mb-6">
                    <h5 class="font-bold mb-2">Performance Distribution</h5>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span>90% and above</span>
                                <span>25%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-green-600 h-2.5 rounded-full" style="width: 25%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span>75% - 89%</span>
                                <span>45%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span>60% - 74%</span>
                                <span>20%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-yellow-600 h-2.5 rounded-full" style="width: 20%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span>Below 60%</span>
                                <span>10%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5">
                                <div class="bg-red-600 h-2.5 rounded-full" style="width: 10%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Improvement Areas -->
                <div>
                    <h5 class="font-bold mb-2">Areas for Improvement</h5>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <ul class="list-disc list-inside space-y-2">
                            <li>Increase participation in class discussions</li>
                            <li>Improve homework submission rate</li>
                            <li>Focus on practical application of concepts</li>
                            <li>Enhance peer learning activities</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
};

// Export the module
window.ReportsInterface = ReportsInterface;
