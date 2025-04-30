// Question Types and Templates
const questionTypes = {
    MCQ: 'mcq',
    FILL_BLANKS: 'fill',
    TRUE_FALSE: 'tf',
    MATCHING: 'match'
};

// Sample Questions Database
const questionsDB = {
    Mathematics: {
        Algebra: [
            {
                type: questionTypes.MCQ,
                question: "What is the value of x in the equation 2x + 5 = 13?",
                options: ["2", "4", "6", "8"],
                correct: 1,
                explanation: "2x + 5 = 13\n2x = 13 - 5\n2x = 8\nx = 4"
            },
            {
                type: questionTypes.FILL_BLANKS,
                question: "The square of a number plus 5 equals 30. The number is ___.",
                answer: "5",
                explanation: "Let x be the number\nx² + 5 = 30\nx² = 25\nx = 5"
            },
            {
                type: questionTypes.TRUE_FALSE,
                question: "The square root of a negative number is always imaginary.",
                answer: true,
                explanation: "Any negative number under a square root results in an imaginary number."
            },
            {
                type: questionTypes.MATCHING,
                pairs: [
                    { left: "x²", right: "Square" },
                    { left: "x³", right: "Cube" },
                    { left: "√x", right: "Square Root" },
                    { left: "∛x", right: "Cube Root" }
                ]
            }
        ],
        Geometry: [
            {
                type: questionTypes.MCQ,
                question: "What is the area of a circle with radius 7 units?",
                options: ["14π", "28π", "49π", "154π"],
                correct: 2,
                explanation: "Area = πr²\nArea = π(7)²\nArea = 49π square units"
            },
            {
                type: questionTypes.FILL_BLANKS,
                question: "The sum of angles in a triangle is ___ degrees.",
                answer: "180",
                explanation: "The angles in a triangle always sum to 180 degrees."
            }
        ]
    },
    Science: {
        Physics: [
            {
                type: questionTypes.MCQ,
                question: "Which of these is the SI unit of force?",
                options: ["Joule", "Newton", "Pascal", "Watt"],
                correct: 1,
                explanation: "Newton (N) is the SI unit of force, named after Sir Isaac Newton."
            },
            {
                type: questionTypes.TRUE_FALSE,
                question: "Light travels faster than sound.",
                answer: true,
                explanation: "Light travels at approximately 3×10⁸ m/s, while sound travels at approximately 343 m/s in air."
            }
        ],
        Chemistry: [
            {
                type: questionTypes.MATCHING,
                pairs: [
                    { left: "H", right: "Hydrogen" },
                    { left: "O", right: "Oxygen" },
                    { left: "Na", right: "Sodium" },
                    { left: "Fe", right: "Iron" }
                ]
            },
            {
                type: questionTypes.FILL_BLANKS,
                question: "The atomic number of an element represents the number of ___ in its nucleus.",
                answer: "protons",
                explanation: "The atomic number uniquely identifies an element by the number of protons in its nucleus."
            }
        ]
    }
};

// Question Rendering Functions
function renderQuestion(question, container) {
    container.innerHTML = '';
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card fade-in';

    switch (question.type) {
        case questionTypes.MCQ:
            renderMCQ(question, questionCard);
            break;
        case questionTypes.FILL_BLANKS:
            renderFillBlanks(question, questionCard);
            break;
        case questionTypes.TRUE_FALSE:
            renderTrueFalse(question, questionCard);
            break;
        case questionTypes.MATCHING:
            renderMatching(question, questionCard);
            break;
    }

    container.appendChild(questionCard);
}

function renderMCQ(question, container) {
    container.innerHTML = `
        <h4 class="font-bold mb-4">${question.question}</h4>
        <div class="space-y-2">
            ${question.options.map((option, index) => `
                <div class="mcq-option" data-index="${index}">
                    <input type="radio" id="option${index}" name="mcq" class="mr-2">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </div>
        <div class="mt-4">
            <button class="check-answer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answer</button>
            <div class="explanation mt-4 hidden"></div>
        </div>
    `;

    const options = container.querySelectorAll('.mcq-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input').checked = true;
        });
    });

    container.querySelector('.check-answer').addEventListener('click', () => {
        const selectedOption = container.querySelector('input:checked');
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.parentElement.dataset.index);
            const explanation = container.querySelector('.explanation');
            explanation.classList.remove('hidden');
            
            if (selectedIndex === question.correct) {
                explanation.innerHTML = `
                    <div class="text-green-600">Correct! ✓</div>
                    <div class="mt-2">${question.explanation}</div>
                `;
            } else {
                explanation.innerHTML = `
                    <div class="text-red-600">Incorrect! ✗</div>
                    <div class="mt-2">${question.explanation}</div>
                `;
            }
        }
    });
}

function renderFillBlanks(question, container) {
    container.innerHTML = `
        <h4 class="font-bold mb-4">${question.question}</h4>
        <div class="mt-4">
            <input type="text" class="answer-input border rounded px-2 py-1" placeholder="Type your answer">
            <button class="check-answer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">Check Answer</button>
            <div class="explanation mt-4 hidden"></div>
        </div>
    `;

    container.querySelector('.check-answer').addEventListener('click', () => {
        const userAnswer = container.querySelector('.answer-input').value.trim().toLowerCase();
        const explanation = container.querySelector('.explanation');
        explanation.classList.remove('hidden');
        
        if (userAnswer === question.answer.toLowerCase()) {
            explanation.innerHTML = `
                <div class="text-green-600">Correct! ✓</div>
                <div class="mt-2">${question.explanation}</div>
            `;
        } else {
            explanation.innerHTML = `
                <div class="text-red-600">Incorrect! The answer is: ${question.answer}</div>
                <div class="mt-2">${question.explanation}</div>
            `;
        }
    });
}

function renderTrueFalse(question, container) {
    container.innerHTML = `
        <h4 class="font-bold mb-4">${question.question}</h4>
        <div class="space-y-2">
            <div class="mcq-option">
                <input type="radio" id="true" name="tf" value="true" class="mr-2">
                <label for="true">True</label>
            </div>
            <div class="mcq-option">
                <input type="radio" id="false" name="tf" value="false" class="mr-2">
                <label for="false">False</label>
            </div>
        </div>
        <div class="mt-4">
            <button class="check-answer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answer</button>
            <div class="explanation mt-4 hidden"></div>
        </div>
    `;

    const options = container.querySelectorAll('.mcq-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input').checked = true;
        });
    });

    container.querySelector('.check-answer').addEventListener('click', () => {
        const selectedOption = container.querySelector('input:checked');
        if (selectedOption) {
            const userAnswer = selectedOption.value === 'true';
            const explanation = container.querySelector('.explanation');
            explanation.classList.remove('hidden');
            
            if (userAnswer === question.answer) {
                explanation.innerHTML = `
                    <div class="text-green-600">Correct! ✓</div>
                    <div class="mt-2">${question.explanation}</div>
                `;
            } else {
                explanation.innerHTML = `
                    <div class="text-red-600">Incorrect! The answer is: ${question.answer}</div>
                    <div class="mt-2">${question.explanation}</div>
                `;
            }
        }
    });
}

function renderMatching(question, container) {
    // Create shuffled arrays for both sides
    const shuffledRight = [...question.pairs].map(p => p.right).sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <h4 class="font-bold mb-4">Match the following:</h4>
        <div class="matching-container">
            ${question.pairs.map((pair, index) => `
                <div class="matching-item">
                    <div class="matching-left">${pair.left}</div>
                    <select class="matching-select border rounded px-2 py-1">
                        <option value="">Select answer</option>
                        ${shuffledRight.map(right => `
                            <option value="${right}">${right}</option>
                        `).join('')}
                    </select>
                </div>
            `).join('')}
        </div>
        <div class="mt-4">
            <button class="check-answer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answers</button>
            <div class="explanation mt-4 hidden"></div>
        </div>
    `;

    container.querySelector('.check-answer').addEventListener('click', () => {
        const pairs = question.pairs;
        const selects = container.querySelectorAll('.matching-select');
        const explanation = container.querySelector('.explanation');
        let correct = 0;

        selects.forEach((select, index) => {
            if (select.value === pairs[index].right) {
                correct++;
                select.classList.add('border-green-500');
                select.classList.remove('border-red-500');
            } else {
                select.classList.add('border-red-500');
                select.classList.remove('border-green-500');
            }
        });

        explanation.classList.remove('hidden');
        explanation.innerHTML = `
            <div class="text-${correct === pairs.length ? 'green' : 'red'}-600">
                You got ${correct} out of ${pairs.length} correct!
            </div>
            ${correct !== pairs.length ? `
                <div class="mt-2">Correct pairs:</div>
                ${pairs.map(pair => `
                    <div class="mt-1">${pair.left} → ${pair.right}</div>
                `).join('')}
            ` : ''}
        `;
    });
}

// Export functions and data
window.Questions = {
    types: questionTypes,
    database: questionsDB,
    render: renderQuestion
};
