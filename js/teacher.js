// Teacher Interface Module
const TeacherInterface = {
    // Question Creation Form Templates
    templates: {
        mcq: `
            <div class="question-form mcq-form">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Question Text</label>
                    <textarea class="question-text shadow border rounded w-full py-2 px-3 text-gray-700" rows="3" required></textarea>
                </div>
                <div class="options-container mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Options</label>
                    <div class="options space-y-2">
                        <div class="option-group flex items-center space-x-2">
                            <input type="radio" name="correct" value="0" required>
                            <input type="text" class="option-text shadow border rounded flex-1 py-1 px-2" placeholder="Option 1" required>
                            <button class="remove-option text-red-600 px-2" type="button">&times;</button>
                        </div>
                    </div>
                    <button type="button" class="add-option mt-2 text-blue-600 text-sm">+ Add Option</button>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Explanation</label>
                    <textarea class="explanation shadow border rounded w-full py-2 px-3 text-gray-700" rows="2" required></textarea>
                </div>
            </div>
        `,
        fillBlanks: `
            <div class="question-form fill-blanks-form">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Question Text (Use ___ for blank)</label>
                    <textarea class="question-text shadow border rounded w-full py-2 px-3 text-gray-700" rows="3" required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Correct Answer</label>
                    <input type="text" class="answer shadow border rounded w-full py-2 px-3 text-gray-700" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Explanation</label>
                    <textarea class="explanation shadow border rounded w-full py-2 px-3 text-gray-700" rows="2" required></textarea>
                </div>
            </div>
        `,
        trueFalse: `
            <div class="question-form true-false-form">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Statement</label>
                    <textarea class="question-text shadow border rounded w-full py-2 px-3 text-gray-700" rows="3" required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Correct Answer</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" name="answer" value="true" required>
                            <span class="ml-2">True</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" name="answer" value="false" required>
                            <span class="ml-2">False</span>
                        </label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Explanation</label>
                    <textarea class="explanation shadow border rounded w-full py-2 px-3 text-gray-700" rows="2" required></textarea>
                </div>
            </div>
        `,
        matching: `
            <div class="question-form matching-form">
                <div class="pairs-container mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Matching Pairs</label>
                    <div class="pairs space-y-2">
                        <div class="pair-group flex items-center space-x-2">
                            <input type="text" class="left-item shadow border rounded flex-1 py-1 px-2" placeholder="Left item" required>
                            <span class="text-gray-500">→</span>
                            <input type="text" class="right-item shadow border rounded flex-1 py-1 px-2" placeholder="Right item" required>
                            <button class="remove-pair text-red-600 px-2" type="button">&times;</button>
                        </div>
                    </div>
                    <button type="button" class="add-pair mt-2 text-blue-600 text-sm">+ Add Pair</button>
                </div>
            </div>
        `
    },

    // Initialize teacher interface
    init(container) {
        this.container = container;
        this.setupQuestionCreation();
        this.setupDPPGeneration();
    },

    // Set up question creation interface
    setupQuestionCreation() {
        const form = document.createElement('div');
        form.className = 'question-creation bg-white p-6 rounded-lg shadow-md';
        form.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Create New Question</h3>
            <form id="questionForm">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Question Type</label>
                    <select id="questionType" class="shadow border rounded w-full py-2 px-3 text-gray-700">
                        <option value="mcq">Multiple Choice</option>
                        <option value="fillBlanks">Fill in the Blanks</option>
                        <option value="trueFalse">True/False</option>
                        <option value="matching">Match the Following</option>
                    </select>
                </div>
                <div id="questionFormContent"></div>
                <div class="flex justify-end mt-4">
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Save Question
                    </button>
                </div>
            </form>
        `;

        this.container.appendChild(form);
        this.setupFormEventListeners();
    },

    // Set up DPP generation interface
    setupDPPGeneration() {
        const dppSection = document.createElement('div');
        dppSection.className = 'dpp-generation mt-8 bg-white p-6 rounded-lg shadow-md';
        dppSection.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Generate DPP</h3>
            <form id="dppForm">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">DPP Title</label>
                    <input type="text" class="shadow border rounded w-full py-2 px-3 text-gray-700" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Question Selection</label>
                    <select class="shadow border rounded w-full py-2 px-3 text-gray-700">
                        <option value="random">Random Questions</option>
                        <option value="manual">Manual Selection</option>
                        <option value="topic">Topic-wise</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Number of Questions</label>
                    <input type="number" min="1" max="50" value="10" class="shadow border rounded w-full py-2 px-3 text-gray-700">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Options</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            Include solutions
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            Randomize question order
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            Add difficulty levels
                        </label>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Generate DPP
                    </button>
                </div>
            </form>
        `;

        this.container.appendChild(dppSection);
        this.setupDPPEventListeners();
    },

    // Set up event listeners for the question creation form
    setupFormEventListeners() {
        const questionType = document.getElementById('questionType');
        const formContent = document.getElementById('questionFormContent');
        const questionForm = document.getElementById('questionForm');

        // Change form based on question type
        questionType.addEventListener('change', () => {
            formContent.innerHTML = this.templates[questionType.value];
            this.setupDynamicFormElements();
        });

        // Initial form setup
        formContent.innerHTML = this.templates[questionType.value];
        this.setupDynamicFormElements();

        // Handle form submission
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const questionData = this.getQuestionData(questionType.value);
            this.saveQuestion(questionData);
        });
    },

    // Set up event listeners for the DPP generation form
    setupDPPEventListeners() {
        const dppForm = document.getElementById('dppForm');
        dppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateDPP();
        });
    },

    // Setup dynamic form elements (add/remove options or pairs)
    setupDynamicFormElements() {
        // For MCQ
        const addOptionBtn = document.querySelector('.add-option');
        if (addOptionBtn) {
            addOptionBtn.addEventListener('click', () => {
                const optionsContainer = document.querySelector('.options');
                const newOption = document.createElement('div');
                newOption.className = 'option-group flex items-center space-x-2';
                newOption.innerHTML = `
                    <input type="radio" name="correct" value="${optionsContainer.children.length}" required>
                    <input type="text" class="option-text shadow border rounded flex-1 py-1 px-2" 
                           placeholder="Option ${optionsContainer.children.length + 1}" required>
                    <button class="remove-option text-red-600 px-2" type="button">&times;</button>
                `;
                optionsContainer.appendChild(newOption);
            });
        }

        // For Matching
        const addPairBtn = document.querySelector('.add-pair');
        if (addPairBtn) {
            addPairBtn.addEventListener('click', () => {
                const pairsContainer = document.querySelector('.pairs');
                const newPair = document.createElement('div');
                newPair.className = 'pair-group flex items-center space-x-2';
                newPair.innerHTML = `
                    <input type="text" class="left-item shadow border rounded flex-1 py-1 px-2" placeholder="Left item" required>
                    <span class="text-gray-500">→</span>
                    <input type="text" class="right-item shadow border rounded flex-1 py-1 px-2" placeholder="Right item" required>
                    <button class="remove-pair text-red-600 px-2" type="button">&times;</button>
                `;
                pairsContainer.appendChild(newPair);
            });
        }

        // Remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-option')) {
                e.target.closest('.option-group').remove();
            }
            if (e.target.classList.contains('remove-pair')) {
                e.target.closest('.pair-group').remove();
            }
        });
    },

    // Get question data from the form
    getQuestionData(type) {
        const data = {
            type: type,
            question: document.querySelector('.question-text')?.value
        };

        switch (type) {
            case 'mcq':
                data.options = Array.from(document.querySelectorAll('.option-text')).map(opt => opt.value);
                data.correct = parseInt(document.querySelector('input[name="correct"]:checked')?.value || 0);
                break;
            case 'fillBlanks':
                data.answer = document.querySelector('.answer').value;
                break;
            case 'trueFalse':
                data.answer = document.querySelector('input[name="answer"]:checked').value === 'true';
                break;
            case 'matching':
                data.pairs = Array.from(document.querySelectorAll('.pair-group')).map(pair => ({
                    left: pair.querySelector('.left-item').value,
                    right: pair.querySelector('.right-item').value
                }));
                break;
        }

        data.explanation = document.querySelector('.explanation')?.value;
        return data;
    },

    // Save question to the database
    saveQuestion(questionData) {
        // In a real application, this would save to a backend
        console.log('Saving question:', questionData);
        alert('Question saved successfully!');
        document.getElementById('questionForm').reset();
    },

    // Generate DPP
    generateDPP() {
        // In a real application, this would generate a PDF
        console.log('Generating DPP...');
        alert('DPP generated successfully!');
        document.getElementById('dppForm').reset();
    }
};

// Export the module
window.TeacherInterface = TeacherInterface;
