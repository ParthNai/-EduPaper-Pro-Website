class AdminInterface {
    static init() {
        this.adminLoginBtn = document.getElementById('adminLoginBtn');
        this.adminLoginForm = document.getElementById('adminLoginForm');
        this.adminDashboard = document.getElementById('adminDashboard');
        this.adminLogoutBtn = document.getElementById('adminLogoutBtn');
        this.setupEventListeners();
    }

    static setupEventListeners() {
        // Show admin login form
        this.adminLoginBtn.addEventListener('click', () => {
            this.showSection(this.adminLoginForm);
        });

        // Handle admin login
        document.getElementById('adminLoginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });

        // Handle admin logout
        this.adminLogoutBtn.addEventListener('click', () => {
            this.handleAdminLogout();
        });

        // Setup quick action buttons
        document.querySelectorAll('.admin-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.currentTarget.textContent.trim());
            });
        });
    }

    static showSection(section) {
        // Hide all sections with fade out
        [loginForm, registrationForm, dashboard, this.adminLoginForm, this.adminDashboard].forEach(s => {
            if (s) {
                s.style.opacity = '0';
                s.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    s.classList.add('hidden');
                }, 300);
            }
        });

        // Show target section with fade in
        setTimeout(() => {
            section.classList.remove('hidden');
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 300);
    }

    static async handleAdminLogin() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        const securityKey = document.getElementById('adminSecurityKey').value;

        // Add loading state
        const submitBtn = document.querySelector('.admin-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Authenticating...</span>';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple validation (replace with actual authentication)
        if (username === 'admin' && password === 'admin123' && securityKey === 'secure123') {
            this.showSection(this.adminDashboard);
            this.updateLastLoginTime();
            this.initDashboardData();
        } else {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'admin-alert';
            errorMsg.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Invalid credentials. Please try again.
            `;
            submitBtn.parentElement.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 3000);
        }

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="flex items-center justify-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>Secure Login</span>';
    }

    static handleAdminLogout() {
        this.showSection(document.getElementById('loginForm'));
    }

    static updateLastLoginTime() {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        document.getElementById('lastLoginTime').textContent = formattedDate;
    }

    static initDashboardData() {
        // Simulate real-time data updates
        setInterval(() => {
            const activeUsers = document.querySelector('.glass-card:nth-child(1) .text-3xl');
            const totalQuestions = document.querySelector('.glass-card:nth-child(2) .text-3xl');
            const systemStatus = document.querySelector('.glass-card:nth-child(3) .text-3xl');

            // Randomly update values
            const currentUsers = parseInt(activeUsers.textContent.replace(',', ''));
            activeUsers.textContent = (currentUsers + Math.floor(Math.random() * 10) - 5).toLocaleString();

            const currentQuestions = parseInt(totalQuestions.textContent.replace(',', ''));
            totalQuestions.textContent = (currentQuestions + Math.floor(Math.random() * 3)).toLocaleString();

            const currentStatus = parseFloat(systemStatus.textContent);
            const newStatus = Math.min(100, Math.max(95, currentStatus + (Math.random() * 0.2 - 0.1))).toFixed(1);
            systemStatus.textContent = newStatus + '%';
        }, 5000);
    }

    static handleQuickAction(action) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'admin-alert';
        notification.style.background = 'rgba(34, 197, 94, 0.1)';
        notification.style.color = '#22c55e';
        
        switch(action) {
            case 'System Alerts':
                notification.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Checking system alerts...
                `;
                break;
            case 'Backup Database':
                notification.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Database backup initiated...
                `;
                break;
            case 'Run Diagnostics':
                notification.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Running system diagnostics...
                `;
                break;
        }

        // Add notification to dashboard
        this.adminDashboard.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize admin interface
document.addEventListener('DOMContentLoaded', () => {
    AdminInterface.init();
});
