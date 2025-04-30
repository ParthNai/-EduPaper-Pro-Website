// Registration Module
const RegisterInterface = {
    // Initialize registration functionality
    init() {
        this.setupEventListeners();
    },

    // Set up event listeners
    setupEventListeners() {
        const registerBtn = document.querySelector('.register-btn');
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegistrationForm();
        });
    },

    // Show registration form
    showRegistrationForm() {
        // Hide other forms/content
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');

        // Create and show registration form
        const mainContent = document.querySelector('main');
        const registrationForm = document.createElement('div');
        registrationForm.id = 'registrationForm';
        registrationForm.className = 'bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto';
        
        registrationForm.innerHTML = `
            <h2 class="text-2xl font-bold mb-6">Create New Account</h2>
            <form id="registerFormElement" class="space-y-6">
                <!-- Basic Information -->
                <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 class="font-bold text-lg mb-2">Basic Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
                                First Name *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="firstName" type="text" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
                                Last Name *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="lastName" type="text" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email Address *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="email" type="email" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                                Phone Number *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="phone" type="tel" pattern="[0-9]{10}" required>
                        </div>
                    </div>
                </div>

                <!-- Role Selection -->
                <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 class="font-bold text-lg mb-2">Account Type</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label class="relative flex flex-col bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                            <input type="radio" name="role" value="student" class="sr-only" required>
                            <span class="font-bold mb-1">Student</span>
                            <span class="text-sm text-gray-600">Access study materials and take tests</span>
                            <span class="absolute top-2 right-2 w-4 h-4 border-2 rounded-full role-radio"></span>
                        </label>
                        <label class="relative flex flex-col bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                            <input type="radio" name="role" value="teacher" class="sr-only" required>
                            <span class="font-bold mb-1">Teacher</span>
                            <span class="text-sm text-gray-600">Create content and manage students</span>
                            <span class="absolute top-2 right-2 w-4 h-4 border-2 rounded-full role-radio"></span>
                        </label>
                        <label class="relative flex flex-col bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                            <input type="radio" name="role" value="institute" class="sr-only" required>
                            <span class="font-bold mb-1">Institute</span>
                            <span class="text-sm text-gray-600">Manage multiple classes and teachers</span>
                            <span class="absolute top-2 right-2 w-4 h-4 border-2 rounded-full role-radio"></span>
                        </label>
                    </div>
                </div>

                <!-- Role-specific Information -->
                <div id="roleSpecificFields" class="bg-gray-50 p-4 rounded-lg space-y-4">
                    <!-- Will be dynamically populated based on role selection -->
                </div>

                <!-- Password -->
                <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 class="font-bold text-lg mb-2">Security</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="password" type="password" required>
                            <p class="text-sm text-gray-600 mt-1">
                                Must be at least 8 characters long with numbers and special characters
                            </p>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
                                Confirm Password *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                                   id="confirmPassword" type="password" required>
                        </div>
                    </div>
                </div>

                <!-- Terms and Conditions -->
                <div class="space-y-4">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" required class="form-checkbox h-4 w-4 text-blue-600">
                        <span class="text-sm text-gray-700">
                            I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a>
                            and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
                        </span>
                    </label>
                </div>

                <!-- Submit Button -->
                <div class="flex items-center justify-between">
                    <button type="submit" 
                            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create Account
                    </button>
                    <button type="button" 
                            class="back-to-login text-blue-600 hover:text-blue-800 font-bold">
                        Back to Login
                    </button>
                </div>
            </form>
        `;

        mainContent.appendChild(registrationForm);
        this.setupFormEventListeners(registrationForm);
    },

    // Set up form event listeners
    setupFormEventListeners(form) {
        // Role selection
        const roleInputs = form.querySelectorAll('input[name="role"]');
        roleInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateRoleSpecificFields(input.value);
                this.styleSelectedRole(input);
            });
        });

        // Back to login button
        const backBtn = form.querySelector('.back-to-login');
        backBtn.addEventListener('click', () => {
            form.remove();
            document.getElementById('loginForm').classList.remove('hidden');
        });

        // Form submission
        const registerForm = form.querySelector('#registerFormElement');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration(registerForm);
        });

        // Password validation
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');
        confirmPassword.addEventListener('input', () => {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords don't match");
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    },

    // Update role-specific fields
    updateRoleSpecificFields(role) {
        const container = document.getElementById('roleSpecificFields');
        container.innerHTML = '';

        switch(role) {
            case 'student':
                container.innerHTML = `
                    <h3 class="font-bold text-lg mb-2">Student Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Education Board *
                            </label>
                            <select class="shadow border rounded w-full py-2 px-3 text-gray-700" required>
                                <option value="">Select Board</option>
                                <option value="cbse">CBSE</option>
                                <option value="state">State Board</option>
                                <option value="icse">ICSE</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Class/Grade *
                            </label>
                            <select class="shadow border rounded w-full py-2 px-3 text-gray-700" required>
                                <option value="">Select Class</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                School Name
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" type="text">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Parent's Email
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" type="email">
                        </div>
                    </div>
                `;
                break;

            case 'teacher':
                container.innerHTML = `
                    <h3 class="font-bold text-lg mb-2">Teacher Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Subject Specialization *
                            </label>
                            <select class="shadow border rounded w-full py-2 px-3 text-gray-700" required multiple>
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="english">English</option>
                                <option value="social">Social Studies</option>
                            </select>
                            <p class="text-sm text-gray-600 mt-1">Hold Ctrl/Cmd to select multiple</p>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Years of Experience *
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" 
                                   type="number" min="0" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Current Institution
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" type="text">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Qualification *
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" 
                                   type="text" required>
                        </div>
                    </div>
                `;
                break;

            case 'institute':
                container.innerHTML = `
                    <h3 class="font-bold text-lg mb-2">Institute Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Institute Name *
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" 
                                   type="text" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Type of Institute *
                            </label>
                            <select class="shadow border rounded w-full py-2 px-3 text-gray-700" required>
                                <option value="">Select Type</option>
                                <option value="school">School</option>
                                <option value="college">College</option>
                                <option value="coaching">Coaching Center</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Address *
                            </label>
                            <textarea class="shadow border rounded w-full py-2 px-3 text-gray-700" 
                                      rows="2" required></textarea>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Website
                            </label>
                            <input class="shadow border rounded w-full py-2 px-3 text-gray-700" 
                                   type="url" placeholder="https://">
                        </div>
                    </div>
                `;
                break;
        }
    },

    // Style selected role
    styleSelectedRole(selectedInput) {
        const roleLabels = document.querySelectorAll('input[name="role"]').forEach(input => {
            const label = input.closest('label');
            if (input === selectedInput) {
                label.classList.add('ring-2', 'ring-blue-600');
                label.querySelector('.role-radio').classList.add('bg-blue-600');
            } else {
                label.classList.remove('ring-2', 'ring-blue-600');
                label.querySelector('.role-radio').classList.remove('bg-blue-600');
            }
        });
    },

    // Handle registration form submission
    handleRegistration(form) {
        // Get form data
        const formData = new FormData(form);
        const data = {
            firstName: form.querySelector('#firstName').value,
            lastName: form.querySelector('#lastName').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            role: formData.get('role'),
            password: form.querySelector('#password').value
        };

        // In a real application, this would make an API call to register the user
        console.log('Registration data:', data);

        // Show success message
        alert('Registration successful! Please log in.');
        
        // Remove registration form and show login form
        document.getElementById('registrationForm').remove();
        document.getElementById('loginForm').classList.remove('hidden');
    }
};

// Export the module
window.RegisterInterface = RegisterInterface;
