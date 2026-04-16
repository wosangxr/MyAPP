// ============================================================
//  Company Test — Frontend Logic
//  Modules: Auth, Theme, Nav, Dashboard, Jobs, Applicants, Profile
// ============================================================

// ── Firebase Configuration ──
// 🔧 ใส่ค่าจาก Firebase Console → Project Settings → General → Web app
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAuXIu9TxTTkVzm1N5NOV2x558LWEtRwDQ",
    authDomain: "project-app-75386.firebaseapp.com",
    projectId: "project-app-75386",
    storageBucket: "project-app-75386.firebasestorage.app",
    messagingSenderId: "28006691314",
    appId: "1:28006691314:web:5cc4095bd9fe4038117b6b",
};

const API_URL = 'http://localhost:3001/api';
const IS_DEMO = false; // Forced to false for migration

// Initialize Firebase
let firebaseApp = null;
let firebaseAuth = null;
if (!IS_DEMO && window.firebase) {
    firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    firebaseAuth = firebase.auth();
    console.log('✅ Firebase initialized');
} else {
    console.log('⚠️  Demo Mode — Firebase not configured');
}

// ============================================================
// MOCK DATA (Demo Mode)
// ============================================================
const MOCK = {
    company: {
        id: 'demo-company-1',
        company_name: 'บริษัท ดิจิทัล เทค จำกัด',
        industry: 'เทคโนโลยีสารสนเทศ',
        company_size: '51-200 คน',
        description: 'บริษัทพัฒนาซอฟต์แวร์ชั้นนำ มุ่งเน้นสร้างสรรค์โซลูชันดิจิทัลที่ทันสมัย ส่งเสริมวัฒนธรรมการทำงานแบบ Agile และ Innovation-driven',
        website: 'https://digitaltech.co.th',
        location: 'กรุงเทพฯ, สีลม',
        contact_email: 'hr@digitaltech.co.th',
        contact_phone: '02-123-4567',
        logo_url: null
    },
    jobs: [
        { id: '1', title: 'Full Stack Developer', description: 'พัฒนาเว็บแอปพลิเคชัน ทั้ง Frontend และ Backend', requirements: 'React, Node.js, PostgreSQL, 2+ ปี', salary_min: 35000, salary_max: 65000, job_type: 'full-time', location: 'กรุงเทพฯ', remote_option: 'hybrid', category: 'IT', experience_level: 'mid', status: 'active', created_at: new Date(Date.now() - 2*86400000).toISOString(), applications_count: 12 },
        { id: '2', title: 'UX/UI Designer', description: 'ออกแบบ User Interface และ User Experience สำหรับแอปพลิเคชัน', requirements: 'Figma, Adobe XD, Design Thinking', salary_min: 30000, salary_max: 55000, job_type: 'full-time', location: 'กรุงเทพฯ', remote_option: 'onsite', category: 'Design', experience_level: 'mid', status: 'active', created_at: new Date(Date.now() - 5*86400000).toISOString(), applications_count: 8 },
        { id: '3', title: 'Digital Marketing Specialist', description: 'วางแผนและจัดการแคมเปญโฆษณาดิจิทัล', requirements: 'Google Ads, Facebook Ads, SEO, Analytics', salary_min: 25000, salary_max: 45000, job_type: 'full-time', location: 'กรุงเทพฯ', remote_option: 'remote', category: 'Marketing', experience_level: 'entry', status: 'active', created_at: new Date(Date.now() - 10*86400000).toISOString(), applications_count: 15 },
        { id: '4', title: 'DevOps Engineer', description: 'ดูแลระบบ Infrastructure และ CI/CD Pipeline', requirements: 'Docker, Kubernetes, AWS, Linux', salary_min: 45000, salary_max: 80000, job_type: 'full-time', location: 'กรุงเทพฯ', remote_option: 'hybrid', category: 'IT', experience_level: 'senior', status: 'closed', created_at: new Date(Date.now() - 30*86400000).toISOString(), applications_count: 6 },
        { id: '5', title: 'Intern — Frontend Developer', description: 'ฝึกงานพัฒนาเว็บ Frontend', requirements: 'HTML, CSS, JavaScript พื้นฐาน', salary_min: 10000, salary_max: 15000, job_type: 'internship', location: 'กรุงเทพฯ', remote_option: 'onsite', category: 'IT', experience_level: 'entry', status: 'draft', created_at: new Date(Date.now() - 1*86400000).toISOString(), applications_count: 0 },
    ],
    applications: [
        { id: 'a1', job_id: '1', job_title: 'Full Stack Developer', applicant_name: 'สมชาย ใจดี', applicant_email: 'somchai@email.com', status: 'pending', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 'a2', job_id: '1', job_title: 'Full Stack Developer', applicant_name: 'สุภาพร เก่งมาก', applicant_email: 'supaporn@email.com', status: 'reviewing', created_at: new Date(Date.now() - 2*3600000).toISOString() },
        { id: 'a3', job_id: '2', job_title: 'UX/UI Designer', applicant_name: 'ณัฐพล สร้างสรรค์', applicant_email: 'nattapon@email.com', status: 'interview', created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 'a4', job_id: '3', job_title: 'Digital Marketing Specialist', applicant_name: 'พิมพ์ชนก ดีไซน์', applicant_email: 'pimchanok@email.com', status: 'accepted', created_at: new Date(Date.now() - 2*86400000).toISOString() },
        { id: 'a5', job_id: '1', job_title: 'Full Stack Developer', applicant_name: 'วรภัทร โค้ดเดอร์', applicant_email: 'worapat@email.com', status: 'rejected', created_at: new Date(Date.now() - 3*86400000).toISOString() },
        { id: 'a6', job_id: '3', job_title: 'Digital Marketing Specialist', applicant_name: 'กานต์ธีรา มาร์เก็ต', applicant_email: 'kantira@email.com', status: 'pending', created_at: new Date(Date.now() - 4*3600000).toISOString() },
        { id: 'a7', job_id: '2', job_title: 'UX/UI Designer', applicant_name: 'ปริญญา ศิลปิน', applicant_email: 'parinya@email.com', status: 'pending', created_at: new Date(Date.now() - 5*3600000).toISOString() },
        { id: 'a8', job_id: '1', job_title: 'Full Stack Developer', applicant_name: 'ธนากร เทคนิค', applicant_email: 'thanakorn@email.com', status: 'reviewing', created_at: new Date(Date.now() - 6*3600000).toISOString() },
    ],
    stats: {
        total_jobs: 3,
        total_applications: 8,
        pending: 3,
        accepted: 1
    }
};

// ============================================================
// UTILS
// ============================================================
const Utils = {
    getCurrentPage() {
        const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        return path === '' ? 'index' : path;
    },

    showToast(msg, isError = false) {
        const toast = document.getElementById('toast');
        const msgEl = document.getElementById('toastMessage');
        if (!toast || !msgEl) return;
        msgEl.textContent = msg;
        toast.classList.toggle('error', isError);
        const icon = toast.querySelector('i');
        if (icon) icon.className = isError ? 'bx bx-error-circle' : 'bx bx-check-circle';
        const h4 = toast.querySelector('h4');
        if (h4) h4.textContent = isError ? 'ข้อผิดพลาด' : 'สำเร็จ!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    },

    formatDate(dateStr) {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('th-TH', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    },

    formatSalary(min, max) {
        const fmt = n => n ? n.toLocaleString('th-TH') : null;
        if (min && max) return `฿${fmt(min)} - ${fmt(max)}`;
        if (min) return `฿${fmt(min)}+`;
        if (max) return `ถึง ฿${fmt(max)}`;
        return 'ตามตกลง';
    },

    getStatusBadge(status) {
        const map = {
            active: ['เปิดรับ', 'badge-active'],
            closed: ['ปิดรับแล้ว', 'badge-closed'],
            draft: ['ฉบับร่าง', 'badge-draft'],
            pending: ['รอพิจารณา', 'badge-pending'],
            reviewing: ['กำลังตรวจสอบ', 'badge-reviewing'],
            interview: ['นัดสัมภาษณ์', 'badge-interview'],
            accepted: ['ส่งข้อเสนอแล้ว', 'badge-accepted'],
            hired: ['รับเข้าทำงาน', 'badge-hired'],
            rejected: ['ปฏิเสธ', 'badge-rejected']
        };
        const [text, cls] = map[status] || [status, 'badge-draft'];
        return `<span class="badge ${cls}">${text}</span>`;
    },

    getJobTypeLabel(type) {
        const map = { 'full-time': 'งานประจำ', 'part-time': 'พาร์ทไทม์', 'contract': 'สัญญาจ้าง', 'internship': 'ฝึกงาน' };
        return map[type] || type;
    },

    getRemoteLabel(r) {
        const map = { 'onsite': 'Onsite', 'remote': 'Remote', 'hybrid': 'Hybrid' };
        return map[r] || r;
    },

    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }
};

// ============================================================
// THEME MODULE
// ============================================================
const Theme = {
    init() {
        const saved = localStorage.getItem('ct_theme') || 'dark';
        this.apply(saved);
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const current = document.body.getAttribute('data-theme') || 'dark';
                const next = current === 'dark' ? 'light' : 'dark';
                this.apply(next);
                localStorage.setItem('ct_theme', next);
            });
        }
    },

    apply(theme) {
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', theme);
        }
        const btn = document.getElementById('themeToggle');
        if (btn) {
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span');
            if (icon) icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
            if (text) text.textContent = theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด';
        }
    }
};

// ============================================================
// NAV MODULE
// ============================================================
const Nav = {
    init() {
        const toggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const close = document.getElementById('sidebarClose');
        const overlay = document.getElementById('sidebarOverlay');

        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.add('open');
                if (overlay) overlay.classList.add('active');
            });
        }
        const closeSidebar = () => {
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        };
        if (close) close.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);
    }
};

// ============================================================
// AUTH MODULE — Firebase Auth
// ============================================================
const Auth = {
    currentUser: null,
    idToken: null,
    currentLang: localStorage.getItem('company_lang') || 'th',

    translations: {
        th: {
            login_title: "เข้าสู่ระบบองค์กร",
            label_email: "อีเมลองค์กร (Business Email)",
            label_password: "รหัสผ่าน (Password)",
            forgot_pass: "ลืมรหัสผ่าน?",
            btn_login: "เข้าสู่ระบบ",
            footer_text: "ระบบจัดการผู้สมัครสำหรับ HR มืออาชีพ",
            toast_success: "เข้าสู่ระบบสำเร็จ",
            // Sidebar
            menu_dashboard: "แดชบอร์ด",
            menu_jobs: "ประกาศงาน",
            menu_applicants: "ผู้สมัคร",
            menu_search: "ค้นหาเรซูเม่",
            menu_profile: "โปรไฟล์บริษัท",
            menu_settings: "ตั้งค่าองค์กร",
            menu_theme: "เปลี่ยนธีม",
            menu_logout: "ออกจากระบบ",
            // General
            err_empty: "กรุณากรอกอีเมลและรหัสผ่าน",

            err_only_hr: "บัญชีนี้ไม่มีสิทธิ์เข้าใช้งานระบบสำหรับบริษัท",
            err_not_found: "ไม่พบอีเมลนี้ในระบบ",
            err_wrong_pass: "รหัสผ่านไม่ถูกต้อง",
            err_invalid_email: "รูปแบบอีเมลไม่ถูกต้อง",
            err_failed: "เข้าสู่ระบบไม่สำเร็จ: ",
            // Applicants Stats/Board
            stat_total: "ใบสมัครทั้งหมด",
            stat_pending: "รอพิจารณา",
            stat_interview: "นัดสัมภาษณ์",
            stat_hired: "รับเข้าทำงาน",
            stat_rejected: "ไม่ผ่านเกณฑ์",
            col_new: "มาใหม่",
            col_screened: "ตรวจสอบแล้ว",
            col_interview: "สัมภาษณ์",
            col_offered: "ส่งข้อเสนอ",
            col_hired: "จ้างงาน",
            col_rejected: "ปฏิเสธ"
        },
        en: {
            login_title: "Employer Login",
            label_email: "Business Email",
            label_password: "Password",
            forgot_pass: "Forgot password?",
            btn_login: "Sign In",
            footer_text: "Applicant Management System for HR Professionals",
            toast_success: "Login successful",
            // Sidebar
            menu_dashboard: "Dashboard",
            menu_jobs: "Job Postings",
            menu_applicants: "Applicants",
            menu_search: "Search Resumes",
            menu_profile: "Company Profile",
            menu_settings: "Settings",
            menu_theme: "Change Theme",
            menu_logout: "Logout",
            // General
            err_empty: "Please enter email and password",

            err_only_hr: "This account does not have permission for the company portal",
            err_not_found: "Email not found",
            err_wrong_pass: "Incorrect password",
            err_invalid_email: "Invalid email format",
            err_failed: "Login failed: ",
            // Applicants Stats/Board
            stat_total: "Total Applications",
            stat_pending: "Pending",
            stat_interview: "Interviewing",
            stat_hired: "Hired",
            stat_rejected: "Rejected",
            col_new: "New",
            col_screened: "Screened",
            col_interview: "Interviewing",
            col_offered: "Offered",
            col_hired: "Hired",
            col_rejected: "Rejected"
        }
    },

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('company_lang', lang);
        this.updateUI();
    },

    updateUI() {
        const t = this.translations[this.currentLang];
        
        // Update texts
        const ids = {
            'loginTitle': t.login_title,
            'labelEmail': t.label_email,
            'labelPassword': t.label_password,
            'forgotPasswordLink': t.forgot_pass,
            'btnText': t.btn_login,
            'footerText': t.footer_text,
            // Sidebar links
            'menuDashboard': t.menu_dashboard,
            'menuJobs': t.menu_jobs,
            'menuApplicants': t.menu_applicants,
            'menuSearch': t.menu_search,
            'menuProfile': t.menu_profile,
            'menuSettings': t.menu_settings,
            'btnThemeText': t.menu_theme,
            'btnLogoutText': t.menu_logout
        };

        // Update texts from the mapping
        for (const [id, text] of Object.entries(ids)) {
            const el = document.getElementById(id);
            if (el) {
                const span = el.querySelector('span');
                if (span) span.textContent = text;
                else el.textContent = text;
            }
        }

        const currentPage = Utils.getCurrentPage();

        // General UI (Page Title)
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            if (currentPage === 'applicants') pageTitle.textContent = t.menu_applicants;
            else if (currentPage === 'jobs') pageTitle.textContent = t.menu_jobs;
            else if (currentPage === 'profile') pageTitle.textContent = t.menu_profile;
            else if (currentPage === 'settings') pageTitle.textContent = t.menu_settings;
            else if (currentPage === 'search') pageTitle.textContent = t.menu_search;
        }

        // Applicants Page Localization
        if (currentPage === 'applicants') {
            const applicantsIds = {
                'statTotalLabel': t.stat_total,
                'statPendingLabel': t.stat_pending,
                'statInterviewLabel': t.stat_interview,
                'statHiredLabel': t.stat_hired,
                'statRejectedLabel': t.stat_rejected,
                'colNewText': t.col_new,
                'colScreenedText': t.col_screened,
                'colInterviewingText': t.col_interview,
                'colOfferedText': t.col_offered,
                'colHiredText': t.col_hired,
                'colRejectedText': t.col_rejected
            };
            for (const [id, text] of Object.entries(applicantsIds)) {
                const el = document.getElementById(id);
                if (el) {
                    // For Kanban headers: H3 > TEXT + SPAN(count)
                    // We only want to update the text part
                    const countSpan = el.querySelector('.kanban-count');
                    if (countSpan) {
                        // Preserve the span, just update the direct text node
                        const countHtml = countSpan.outerHTML;
                        el.innerHTML = `${text} ${countHtml}`;
                    } else {
                        const span = el.querySelector('span');
                        if (span) span.textContent = text;
                        else el.textContent = text;
                    }
                }
            }
        }

        // Update active buttons in Login page
        document.getElementById('langTH')?.classList.toggle('active', this.currentLang === 'th');
        document.getElementById('langEN')?.classList.toggle('active', this.currentLang === 'en');
        
        // Update Sidebar toggle button text (Show the opposite language to switch to)
        const sidebarBtn = document.getElementById('sidebarLangToggle');
        if (sidebarBtn) {
            sidebarBtn.textContent = this.currentLang === 'th' ? 'EN' : 'TH';
        }

        // Update document title
        const titles = {
            'index': this.currentLang === 'th' ? "Company Test — เข้าสู่ระบบ" : "Company Test — Login",
            'dashboard': this.currentLang === 'th' ? "Dashboard — แดชบอร์ด" : "Dashboard — Company Test",
            'jobs': this.currentLang === 'th' ? "จัดการงาน" : "Job Management",
            'applicants': this.currentLang === 'th' ? "ผู้สมัคร" : "Applicant Tracking",
            'profile': this.currentLang === 'th' ? "โปรไฟล์บริษัท" : "Company Profile"
        };
        if (titles[currentPage]) document.title = titles[currentPage];
    },

    initApp() {
        this.updateUI();
        const sidebarLangBtn = document.getElementById('sidebarLangToggle');
        if (sidebarLangBtn) {
            sidebarLangBtn.onclick = () => {
                const next = this.currentLang === 'th' ? 'en' : 'th';
                this.switchLanguage(next);
            };
        }
    },
    initLoginPage() {
        this.updateUI(); // Set initial language
        
        const langTH = document.getElementById('langTH');
        const langEN = document.getElementById('langEN');
        if (langTH) langTH.onclick = () => this.switchLanguage('th');
        if (langEN) langEN.onclick = () => this.switchLanguage('en');

        // Email/Password login


        const loginEmailBtn = document.getElementById('loginEmailBtn');
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        const loginError = document.getElementById('loginError');

        if (loginEmailBtn) {
            loginEmailBtn.addEventListener('click', () => this.emailLogin(
                loginEmail?.value, loginPassword?.value, loginError
            ));
        }
        if (loginPassword) {
            loginPassword.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.emailLogin(
                    loginEmail?.value, loginPassword?.value, loginError
                );
            });
        }

        // Tab switching (Login / Register)
        const tabLogin = document.getElementById('tabLogin');
        const tabRegister = document.getElementById('tabRegister');
        const loginPanel = document.getElementById('loginPanel');
        const registerPanel = document.getElementById('registerPanel');

        if (tabLogin && tabRegister) {
            tabLogin.addEventListener('click', () => {
                tabLogin.classList.add('active');
                tabRegister.classList.remove('active');
                if (loginPanel) loginPanel.style.display = 'block';
                if (registerPanel) registerPanel.style.display = 'none';
            });
            tabRegister.addEventListener('click', () => {
                tabRegister.classList.add('active');
                tabLogin.classList.remove('active');
                if (registerPanel) registerPanel.style.display = 'block';
                if (loginPanel) loginPanel.style.display = 'none';
            });
        }

        // Register
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.emailRegister());
        }

        // Forgot password
        const forgotBtn = document.getElementById('forgotPasswordLink');
        if (forgotBtn) {
            forgotBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetPassword(loginEmail?.value, loginError);
            });
        }

        // Check if already logged in
        if (IS_DEMO) {
            if (localStorage.getItem('ct_demo_logged_in')) {
                window.location.href = 'dashboard.html';
            }
        } else if (firebaseAuth) {
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) window.location.href = 'dashboard.html';
            });
        }
    },

    async emailLogin(email, password, errorEl) {
        if (!email || !password) {
            if (errorEl) { 
                errorEl.textContent = this.translations[this.currentLang].err_empty; 
                errorEl.classList.add('show'); 
            }
            return;
        }


        if (IS_DEMO) {
            localStorage.setItem('ct_demo_logged_in', 'true');
            localStorage.setItem('ct_demo_user', JSON.stringify({ name: 'Demo User', email }));
            Utils.showToast('เข้าสู่ระบบสำเร็จ (Demo Mode)');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
            return;
        }

        try {
            if (errorEl) errorEl.classList.remove('show');
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            this.currentUser = result.user;
            this.idToken = await result.user.getIdToken();
            
            // Sync กับ backend และรับข้อมูล profile เพื่อเช็ค role
            const backendData = await this.syncWithBackend();
            
            if (backendData && backendData.user && backendData.user.role === 'user') {
                await firebaseAuth.signOut();
                throw new Error('ONLY_HR_ALLOWED');
            }

            Utils.showToast('เข้าสู่ระบบสำเร็จ');
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        } catch (err) {
            console.error('Login error:', err);
            const t = this.translations[this.currentLang];
            const msg = err.message === 'ONLY_HR_ALLOWED' ? t.err_only_hr
                : err.code === 'auth/user-not-found' ? t.err_not_found
                : err.code === 'auth/wrong-password' ? t.err_wrong_pass
                : err.code === 'auth/invalid-email' ? t.err_invalid_email
                : err.code === 'auth/invalid-credential' ? (this.currentLang === 'th' ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : 'Invalid email or password')
                : t.err_failed + err.message;
            if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('show'); }
        }

    },

    async emailRegister() {
        const email = document.getElementById('registerEmail')?.value;
        const password = document.getElementById('registerPassword')?.value;
        const confirm = document.getElementById('registerConfirm')?.value;
        const errorEl = document.getElementById('registerError');

        if (!email || !password) {
            if (errorEl) { errorEl.textContent = 'กรุณากรอกข้อมูลให้ครบ'; errorEl.classList.add('show'); }
            return;
        }
        if (password.length < 6) {
            if (errorEl) { errorEl.textContent = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว'; errorEl.classList.add('show'); }
            return;
        }
        if (password !== confirm) {
            if (errorEl) { errorEl.textContent = 'รหัสผ่านไม่ตรงกัน'; errorEl.classList.add('show'); }
            return;
        }

        if (IS_DEMO) {
            localStorage.setItem('ct_demo_logged_in', 'true');
            localStorage.setItem('ct_demo_user', JSON.stringify({ name: 'New User', email }));
            Utils.showToast('สมัครสำเร็จ! (Demo Mode)');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
            return;
        }

        try {
            if (errorEl) errorEl.classList.remove('show');
            const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            this.currentUser = result.user;
            this.idToken = await result.user.getIdToken();
            await this.syncWithBackend({ role: 'company' });
            Utils.showToast('สมัครสมาชิกสำเร็จ!');
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        } catch (err) {
            console.error('Register error:', err);
            const msg = err.code === 'auth/email-already-in-use' ? 'อีเมลนี้ถูกใช้ไปแล้ว'
                : err.code === 'auth/weak-password' ? 'รหัสผ่านไม่ปลอดภัยพอ'
                : 'สมัครไม่สำเร็จ: ' + err.message;
            if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('show'); }
        }
    },

    async resetPassword(email, errorEl) {
        if (!email) {
            if (errorEl) { errorEl.textContent = 'กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน'; errorEl.classList.add('show'); }
            return;
        }
        
        if (IS_DEMO) {
            Utils.showToast('ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว (Demo Mode)');
            return;
        }

        try {
            if (errorEl) errorEl.classList.remove('show');
            await firebaseAuth.sendPasswordResetEmail(email);
            Utils.showToast('ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว');
        } catch (err) {
            console.error('Reset password error:', err);
            const msg = err.code === 'auth/user-not-found' ? 'ไม่พบอีเมลนี้ในระบบ' : 'ไม่สามารถส่งลิงก์ได้: ' + err.message;
            if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('show'); }
        }
    },

    async syncWithBackend(extraData = {}) {
        try {
            const token = this.idToken || (this.currentUser ? await this.currentUser.getIdToken() : null);
            if (!token) return;
            const res = await fetch(`${API_URL}/auth/me`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(extraData)
            });
            return await res.json();
        } catch (err) {
            console.error('Backend sync error:', err.message);
            throw err;
        }
    },

    async fetchWithAuth(url, options = {}) {
        const token = await this.getToken();
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
        if (options.body && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
        return fetch(url.startsWith('http') ? url : `${API_URL}${url}`, { ...options, headers });
    },

    async getToken() {
        if (IS_DEMO) return 'demo-token';
        if (!firebaseAuth || !firebaseAuth.currentUser) return null;
        return await firebaseAuth.currentUser.getIdToken();
    },

    requireAuth() {
        if (IS_DEMO) {
            if (!localStorage.getItem('ct_demo_logged_in')) {
                window.location.href = 'index.html';
            }
            const user = JSON.parse(localStorage.getItem('ct_demo_user') || '{}');
            const avatarEl = document.getElementById('userAvatar');
            const nameEl = document.getElementById('userName');
            if (avatarEl) avatarEl.textContent = Utils.getInitials(user.name || 'Demo');
            if (nameEl) nameEl.textContent = user.name || 'Demo User';
            return;
        }

        if (!firebaseAuth) {
            window.location.href = 'index.html';
            return;
        }

        firebaseAuth.onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = 'index.html';
                return;
            }
            this.currentUser = user;
            this.idToken = await user.getIdToken();

            try {
                const res = await this.fetchWithAuth('/auth/profile');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user && data.user.role === 'user') {
                        await firebaseAuth.signOut();
                        alert('บัญชีนี้ไม่มีสิทธิ์เข้าใช้งานระบบสำหรับบริษัท');
                        window.location.href = 'index.html';
                        return;
                    }
                }
            } catch (err) {
                console.error("Role check failed:", err);
            }

            const avatarEl = document.getElementById('userAvatar');
            const nameEl = document.getElementById('userName');
            const name = user.displayName || user.email || 'User';
            if (avatarEl) avatarEl.textContent = Utils.getInitials(name);
            if (nameEl) nameEl.textContent = name;
        });
    },

    initLogout() {
        const btn = document.getElementById('logoutBtn');
        if (!btn) return;
        btn.addEventListener('click', async () => {
            if (!confirm('ต้องการออกจากระบบหรือไม่?')) return;
            if (IS_DEMO) {
                localStorage.removeItem('ct_demo_logged_in');
                localStorage.removeItem('ct_demo_user');
            } else if (firebaseAuth) {
                await firebaseAuth.signOut();
            }
            window.location.href = 'index.html';
        });
    }
};

// ============================================================
// DASHBOARD MODULE
// ============================================================
const Dashboard = {
    async init() {
        await this.loadStats();
        await this.loadCharts();
        await this.loadRecentApplications();
    },

    async loadStats() {
        try {
            const res = await Auth.fetchWithAuth('/stats');
            const stats = await res.json();
            this.animateNumber('statJobs', stats.total_jobs || 0);
            this.animateNumber('statNewApplicants', stats.total_applications || 3); // Mock
            this.animateNumber('statPending', stats.pending || 0);
            this.animateNumber('statInterview', stats.accepted || 1); // Mock
        } catch (err) {
            console.error('Load stats error:', err);
        }
    },

    animateNumber(id, target) {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current;
        }, 40);
    },

    async loadCharts() {
        if (typeof Chart === 'undefined') return;

        const isDark = !document.body.getAttribute('data-theme') || document.body.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
        const textColor = isDark ? '#b8b0d8' : '#4a4068';

        // Views vs Applies Chart
        const ctx1 = document.getElementById('viewsVsAppliesChart');
        if (ctx1) {
            const labels = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
            const viewsData = IS_DEMO ? [120, 150, 130, 200, 180, 90, 110] : [0,0,0,0,0,0,0];
            const appliesData = IS_DEMO ? [10, 15, 12, 25, 20, 5, 8] : [0,0,0,0,0,0,0];
            new Chart(ctx1, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'ยอดเข้าชม',
                            data: viewsData,
                            borderColor: '#8880a8',
                            backgroundColor: 'transparent',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointRadius: 0,
                            tension: 0.4
                        },
                        {
                            label: 'ใบสมัคร',
                            data: appliesData,
                            borderColor: '#7c3aed',
                            backgroundColor: 'rgba(124, 58, 237, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#7c3aed',
                            pointBorderColor: '#fff',
                            pointRadius: 4,
                            pointHoverRadius: 6,
                        }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        legend: { 
                            position: 'top', 
                            labels: { color: textColor, usePointStyle: true, pointStyle: 'circle' } 
                        } 
                    },
                    scales: {
                        x: { grid: { color: gridColor }, ticks: { color: textColor } },
                        y: { grid: { color: gridColor }, ticks: { color: textColor }, beginAtZero: true }
                    }
                }
            });
        }
    },

    async loadRecentApplications() {
        const container = document.getElementById('recentApplications');
        if (!container) return;

        let apps = [];
        try {
            // Get all applications for the company
            const res = await Auth.fetchWithAuth('/stats/admin/applications'); // Need a company-specific one later?
            // For now, assume the backend filters by company if using authMiddleware
            const allApps = await res.json();
            apps = allApps.slice(0, 5);
        } catch (err) {
            console.error('Load recent apps error:', err);
        }

        if (apps.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="bx bx-inbox"></i><h3>ยังไม่มีใบสมัคร</h3><p>เมื่อมีคนสมัครงาน จะแสดงที่นี่</p></div>';
            return;
        }

        container.innerHTML = apps.map(app => `
            <div class="applicant-card" style="animation: fadeInUp 0.4s ease-out backwards; animation-delay: ${apps.indexOf(app) * 0.08}s;">
                <div class="applicant-avatar">${Utils.getInitials(app.applicant_name)}</div>
                <div class="applicant-info">
                    <h4>${app.applicant_name}</h4>
                    <p><i class="bx bx-briefcase"></i> ${app.job_title} · ${Utils.formatDate(app.created_at)}</p>
                </div>
                <div class="applicant-meta">
                    ${Utils.getStatusBadge(app.status)}
                </div>
            </div>
        `).join('');
    }
};

// ============================================================
// JOBS MODULE
// ============================================================
const Jobs = {
    allJobs: [],
    currentFilter: 'all',

    async init() {
        try {
            const res = await Auth.fetchWithAuth('/jobs');
            this.allJobs = await res.json();
        } catch (err) {
            console.error('Fetch jobs error:', err);
            this.allJobs = [];
        }
        this.render();
        this.initModal();
        this.initFilters();
        this.initSearch();
    },

    render(filter = this.currentFilter) {
        const container = document.getElementById('jobList');
        if (!container) return;

        let jobs = [...this.allJobs];
        if (filter !== 'all') jobs = jobs.filter(j => j.status === filter);

        // Search filter
        const search = document.getElementById('jobSearch');
        if (search && search.value.trim()) {
            const q = search.value.toLowerCase();
            jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || (j.location || '').toLowerCase().includes(q));
        }

        if (jobs.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="bx bx-briefcase-alt"></i><h3>ไม่พบประกาศงาน</h3><p>ลองเปลี่ยนตัวกรอง หรือสร้างประกาศงานใหม่</p></div>';
            return;
        }

        container.innerHTML = jobs.map((job, i) => `
            <div class="job-card" style="animation: fadeInUp 0.4s ease-out backwards; animation-delay: ${i * 0.06}s;" data-id="${job.id}">
                <div class="job-card-info">
                    <h3>
                        ${job.title}
                        ${Utils.getStatusBadge(job.status)}
                    </h3>
                    <div class="job-card-meta">
                        <span><i class="bx bx-map"></i> ${job.location || '-'}</span>
                        <span><i class="bx bx-time-five"></i> ${Utils.getJobTypeLabel(job.job_type)}</span>
                        <span><i class="bx bx-laptop"></i> ${Utils.getRemoteLabel(job.remote_option)}</span>
                        <span><i class="bx bx-money"></i> ${Utils.formatSalary(job.salary_min, job.salary_max)}</span>
                        <span><i class="bx bx-user"></i> ${job.applications_count || 0} ใบสมัคร</span>
                    </div>
                </div>
                <div class="job-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="Jobs.edit('${job.id}')" title="แก้ไข">
                        <i class="bx bx-edit"></i>
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="Jobs.toggleStatus('${job.id}')" title="เปลี่ยนสถานะ">
                        <i class="bx bx-${job.status === 'active' ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="Jobs.remove('${job.id}')" title="ลบ" style="color: var(--danger);">
                        <i class="bx bx-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    initModal() {
        const addBtn = document.getElementById('addJobBtn');
        const modal = document.getElementById('jobModal');
        const closeBtn = document.getElementById('closeJobModal');
        const cancelBtn = document.getElementById('cancelJobModal');
        const form = document.getElementById('jobForm');

        const open = () => { if (modal) modal.classList.add('active'); };
        const close = () => {
            if (modal) modal.classList.remove('active');
            if (form) form.reset();
            document.getElementById('jobId').value = '';
            document.getElementById('modalTitle').textContent = 'สร้างประกาศงานใหม่';
        };

        if (addBtn) addBtn.addEventListener('click', open);
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (cancelBtn) cancelBtn.addEventListener('click', close);
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const jobData = {
                    title: document.getElementById('jobTitle').value,
                    job_type: document.getElementById('jobType').value,
                    remote_option: document.getElementById('jobRemote').value,
                    location: document.getElementById('jobLocation').value,
                    salary_min: parseInt(document.getElementById('jobSalaryMin').value) || null,
                    salary_max: parseInt(document.getElementById('jobSalaryMax').value) || null,
                    category: document.getElementById('jobCategory').value,
                    experience_level: document.getElementById('jobExperience').value,
                    description: document.getElementById('jobDescription').value,
                    requirements: document.getElementById('jobRequirements').value,
                    status: 'active'
                };

                const editId = document.getElementById('jobId').value;
                try {
                    if (editId) {
                        await Auth.fetchWithAuth(`/jobs/${editId}`, {
                            method: 'PUT',
                            body: JSON.stringify(jobData)
                        });
                        Utils.showToast('อัปเดตประกาศงานเรียบร้อย');
                    } else {
                        await Auth.fetchWithAuth('/jobs', {
                            method: 'POST',
                            body: JSON.stringify(jobData)
                        });
                        Utils.showToast('สร้างประกาศงานเรียบร้อย');
                    }
                } catch (err) {
                    Utils.showToast('เกิดข้อผิดพลาดในการบันทึกงาน', true);
                }

                close();
                await this.init(); // Refresh data
            });
        }
    },

    edit(id) {
        const job = this.allJobs.find(j => j.id === id);
        if (!job) return;

        document.getElementById('jobId').value = id;
        document.getElementById('modalTitle').textContent = 'แก้ไขประกาศงาน';
        document.getElementById('jobTitle').value = job.title || '';
        document.getElementById('jobType').value = job.job_type || 'full-time';
        document.getElementById('jobRemote').value = job.remote_option || 'onsite';
        document.getElementById('jobLocation').value = job.location || '';
        document.getElementById('jobSalaryMin').value = job.salary_min || '';
        document.getElementById('jobSalaryMax').value = job.salary_max || '';
        document.getElementById('jobCategory').value = job.category || 'IT';
        document.getElementById('jobExperience').value = job.experience_level || 'entry';
        document.getElementById('jobDescription').value = job.description || '';
        document.getElementById('jobRequirements').value = job.requirements || '';

        document.getElementById('jobModal').classList.add('active');
    },

    toggleStatus(id) {
        const job = this.allJobs.find(j => j.id === id);
        if (!job) return;
        const newStatus = job.status === 'active' ? 'closed' : 'active';
        job.status = newStatus;
        Utils.showToast(`เปลี่ยนสถานะเป็น: ${newStatus === 'active' ? 'เปิดรับ' : 'ปิดรับ'}`);
        this.render();
    },

    remove(id) {
        if (!confirm('ต้องการลบประกาศงานนี้หรือไม่?')) return;
        this.allJobs = this.allJobs.filter(j => j.id !== id);
        Utils.showToast('ลบประกาศงานเรียบร้อย');
        this.render();
    },

    initFilters() {
        document.querySelectorAll('.filter-pill[data-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.render();
            });
        });
    },

    initSearch() {
        const input = document.getElementById('jobSearch');
        if (input) {
            let timer;
            input.addEventListener('input', () => {
                clearTimeout(timer);
                timer = setTimeout(() => this.render(), 300);
            });
        }
    }
};

// ============================================================
// APPLICANTS MODULE
// ============================================================
const Applicants = {
    allApps: [],
    
    async init() {
        try {
            const res = await Auth.fetchWithAuth('/applications');
            this.allApps = await res.json();
            if (IS_DEMO && this.allApps.length === 0) this.allApps = MOCK.applications;
        } catch (err) {
            console.error('Fetch apps error:', err);
            this.allApps = IS_DEMO ? MOCK.applications : [];
        }
        this.renderBoard();
        this.initDrawer();
    },

    renderBoard() {
        const statuses = ['pending', 'reviewing', 'interview', 'accepted', 'hired', 'rejected'];
        
        // Update Stats Summary
        const counts = {
            total: this.allApps.length,
            pending: this.allApps.filter(a => a.status === 'pending').length,
            interview: this.allApps.filter(a => a.status === 'interview').length,
            hired: this.allApps.filter(a => a.status === 'hired').length,
            rejected: this.allApps.filter(a => a.status === 'rejected').length
        };

        const totalEl = document.getElementById('totalApplicants');
        const pendingEl = document.getElementById('pendingApplicants');
        const interviewEl = document.getElementById('interviewApplicants');
        const hiredEl = document.getElementById('hiredApplicants');
        const rejectedEl = document.getElementById('rejectedApplicants');

        if (totalEl) totalEl.textContent = counts.total;
        if (pendingEl) pendingEl.textContent = counts.pending;
        if (interviewEl) interviewEl.textContent = counts.interview;
        if (hiredEl) hiredEl.textContent = counts.hired;
        if (rejectedEl) rejectedEl.textContent = counts.rejected;

        // Render Columns
        statuses.forEach(status => {
            const col = document.getElementById(`col-${status}`);
            const countEl = document.getElementById(`count-${status}`);
            if (!col) return;
            
            let apps = this.allApps.filter(a => a.status === status);
            if (countEl) countEl.textContent = apps.length;

            col.innerHTML = apps.map((app, i) => `
                <div class="applicant-card" id="app-${app.id}" draggable="true" ondragstart="Applicants.drag(event, '${app.id}')" onclick="Applicants.openDrawer('${app.id}')" style="animation: fadeInUp 0.4s ease-out backwards; animation-delay: ${i * 0.05}s;">
                    <div class="applicant-header">
                        <div class="applicant-avatar">${Utils.getInitials(app.applicant_name)}</div>
                        <div class="applicant-info">
                            <h4>${app.applicant_name}</h4>
                            <p>${app.job_title}</p>
                        </div>
                    </div>
                    <div class="applicant-meta">
                        <h1 class="page-title" id="pageTitle">ผู้สมัคร</h1> ${Utils.formatDate(app.created_at)}
                    </div>
                </div>
            `).join('');
        });
    },

    allowDrop(ev) {
        ev.preventDefault();
    },

    drag(ev, id) {
        ev.dataTransfer.setData("text", id);
        setTimeout(() => { if(ev.target) ev.target.classList.add('dragging'); }, 0);
    },

    drop(ev) {
        ev.preventDefault();
        const id = ev.dataTransfer.getData("text");
        const draggedEle = document.getElementById(`app-${id}`);
        if(draggedEle) draggedEle.classList.remove('dragging');

        const col = ev.target.closest('.kanban-column');
        if (!col) return;
        
        const newStatus = col.dataset.status;
        this.updateStatus(id, newStatus);
    },

    async updateStatus(id, newStatus) {
        const appInfo = this.allApps.find(a => a.id === id);
        if(!appInfo || appInfo.status === newStatus) return;

        // Optimistic UI Update
        appInfo.status = newStatus;
        this.renderBoard();

        if (IS_DEMO) {
            Utils.showToast(`ย้ายเป็น: ${newStatus}`);
            return;
        }

        try {
            await Auth.fetchWithAuth(`/applications/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            Utils.showToast(`อัปเดตสถานะเรียบร้อย`);
        } catch(err) {
            Utils.showToast('อัปเดตสถานะไม่สำเร็จ', true);
        }
    },

    initDrawer() {
        const closeBtn = document.getElementById('closeDrawerBtn');
        const overlay = document.getElementById('applicantDrawerOverlay');
        const close = () => this.closeDrawer();
        
        if(closeBtn) closeBtn.addEventListener('click', close);
        if(overlay) overlay.addEventListener('click', close);
    },

    openDrawer(id) {
        const drawer = document.getElementById('applicantDrawer');
        const overlay = document.getElementById('applicantDrawerOverlay');
        const content = document.getElementById('drawerBodyContent');
        if(!drawer || !content) return;

        drawer.classList.add('active');
        if(overlay) overlay.classList.add('active');

        const app = this.allApps.find(a => a.id === id);
        if(!app) return;

        content.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                <div class="applicant-avatar" style="width: 64px; height: 64px; font-size: 1.5rem;">${Utils.getInitials(app.applicant_name)}</div>
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 700;">${app.applicant_name}</h3>
                    <p style="color: var(--primary-light); font-weight: 500;">${app.job_title}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">ข้อมูลติดต่อ</h4>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <i class="bx bx-envelope"></i> ${app.applicant_email || '-'}
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="bx bx-phone"></i> ${app.applicant_phone || '-'}
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">สถานะปัจจุบัน</h4>
                ${Utils.getStatusBadge(app.status)}
            </div>

            <div class="drawer-note-section">
                <h4 style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                    บันทึกจากทีม (HR Notes)
                </h4>
                <textarea class="form-control" placeholder="พิมพ์บันทึกข้อความ ทิ้งไว้ให้ทีมดู..." style="min-height: 80px;"></textarea>
                <div style="text-align: right; margin-top: 0.5rem;">
                    <button class="btn btn-primary btn-sm">บันทึก</button>
                </div>
            </div>
        `;
    },

    closeDrawer() {
        const drawer = document.getElementById('applicantDrawer');
        const overlay = document.getElementById('applicantDrawerOverlay');
        if(drawer) drawer.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
    }
};

// ============================================================
// PROFILE MODULE
// ============================================================
const Profile = {
    async init() {
        await this.loadProfile();
        this.initForm();
        this.initLogoUpload();
    },

    async loadProfile() {
        try {
            const res = await Auth.fetchWithAuth('/auth/profile');
            const { user } = await res.json();
            const company = user.companyId || {}; // Backend populates this if possible

            document.getElementById('companyName').value = company.name || '';
            document.getElementById('industry').value = company.industry || '';
            document.getElementById('companySize').value = company.size || '';
            document.getElementById('location').value = company.location || '';
            document.getElementById('description').value = company.description || '';
            document.getElementById('website').value = company.website || '';
            document.getElementById('contactEmail').value = company.contact_email || user.email || '';
            document.getElementById('contactPhone').value = company.contact_phone || user.phone || '';

            document.getElementById('profileCompanyName').textContent = company.name || 'ชื่อบริษัทของคุณ';
            document.getElementById('profileIndustry').textContent = company.industry || 'กรอกข้อมูลเพื่อเริ่มต้น';
        } catch (err) {
            console.error('Load profile error:', err);
        }
    },

    initForm() {
        const form = document.getElementById('profileForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                company_name: document.getElementById('companyName').value,
                industry: document.getElementById('industry').value,
                company_size: document.getElementById('companySize').value,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value,
                website: document.getElementById('website').value,
                contact_email: document.getElementById('contactEmail').value,
                contact_phone: document.getElementById('contactPhone').value,
            };

            try {
                await Auth.fetchWithAuth('/auth/profile', {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                Utils.showToast('บันทึกข้อมูลโปรไฟล์บริษัทเรียบร้อย');
                this.loadProfile();
            } catch (err) {
                Utils.showToast('บันทึกข้อมูลไม่สำเร็จ', true);
            }
        });

        // Update header live
        const nameInput = document.getElementById('companyName');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                document.getElementById('profileCompanyName').textContent = nameInput.value || 'ชื่อบริษัทของคุณ';
            });
        }
    },

    initLogoUpload() {
        const upload = document.getElementById('logoUpload');
        const input = document.getElementById('logoInput');
        if (!upload || !input) return;

        upload.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
                upload.innerHTML = `<img src="${ev.target.result}" alt="Logo">`;
                Utils.showToast('อัปโหลดโลโก้เรียบร้อย');
            };
            reader.readAsDataURL(file);
        });
    }
};

// ============================================================
// INITIALIZE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Nav.init();

    const page = Utils.getCurrentPage();

    if (page === 'index' || page === '') {
        Auth.initLoginPage();
    } else {
        Auth.requireAuth();
        Auth.initLogout();
        Auth.initApp();

        if (page === 'dashboard') Dashboard.init();
        else if (page === 'jobs') Jobs.init();
        else if (page === 'applicants') Applicants.init();
        else if (page === 'profile') Profile.init();
        else if (page === 'settings') Settings.init();
        else if (page === 'search') Search.init();
    }
});

