import { createContext, useContext, useState } from "react";

const dictionary = {
  // General
  search: { th: "ค้นหางาน...", en: "Search jobs..." },
  sort: { th: "เรียงตาม", en: "Sort by" },
  apply: { th: "สมัคร", en: "Apply" },
  save: { th: "บันทึก", en: "Save" },
  saved: { th: "บันทึกแล้ว", en: "Saved" },
  edit: { th: "แก้ไข", en: "Edit" },
  add: { th: "เพิ่ม", en: "Add" },
  delete: { th: "ลบ", en: "Delete" },
  cancel: { th: "ยกเลิก", en: "Cancel" },
  back: { th: "กลับ", en: "Back" },
  continue_btn: { th: "ดำเนินการต่อ", en: "Continue" },
  remove: { th: "ลบ", en: "Remove" },
  required: { th: "จำเป็น", en: "Required" },
  error: { th: "ข้อผิดพลาด", en: "Error" },
  invalid: { th: "ไม่ถูกต้อง", en: "Invalid" },
  added: { th: "เพิ่มแล้ว", en: "Added" },
  match: { th: "ตรงกัน", en: "Match" },
  match_percent: { th: "% ตรงกัน", en: "% Match" },

  // Settings
  settings: { th: "การตั้งค่า", en: "Settings" },
  language: { th: "ภาษา", en: "Language" },
  thai: { th: "ภาษาไทย", en: "Thai" },
  english: { th: "ภาษาอังกฤษ", en: "English" },

  // Drawer / Navigation
  find_jobs: { th: "ค้นหางาน", en: "Find Jobs" },
  ai_matches: { th: "AI จับคู่", en: "AI Matches" },
  saved_jobs: { th: "งานที่บันทึก", en: "Saved Jobs" },
  swipe_jobs: { th: "ปัดหางาน", en: "Swipe Jobs" },
  my_profile: { th: "โปรไฟล์ของฉัน", en: "My Profile" },
  my_resume: { th: "เรซูเม่ของฉัน", en: "My Resume" },
  interviews: { th: "สัมภาษณ์", en: "Interviews" },
  notifications: { th: "การแจ้งเตือน", en: "Notifications" },
  sign_out: { th: "ออกจากระบบ", en: "Sign Out" },
  career_score: { th: "คะแนนอาชีพ", en: "Career Score" },

  // Jobs
  jobs: { th: "งาน", en: "jobs" },

  // Matches
  ai_matching_skills: { th: "AI จับคู่จากทักษะของคุณ", en: "AI Matching based on your skills" },
  quick_apply: { th: "สมัครเร็ว", en: "Quick Apply" },
  why_you_match: { th: "ทำไมคุณถึงตรงกัน:", en: "Why you match:" },

  // Swipe
  pass: { th: "← ข้าม", en: "← Pass" },
  super_like: { th: "ถูกใจมาก", en: "Super Like" },
  like: { th: "ถูกใจ →", en: "Like →" },
  all_caught_up: { th: "ดูครบหมดแล้ว!", en: "All Caught Up!" },
  swipe_done_text: { th: "คุณได้ดูงานทั้งหมดแล้ว", en: "You've reviewed all available jobs." },
  start_over: { th: "เริ่มใหม่", en: "Start Over" },
  super_like_title: { th: "ถูกใจมาก! ⭐", en: "Super Like! ⭐" },
  super_like_msg: { th: "ใบสมัครของคุณสำหรับ", en: "Your application for" },
  super_like_msg2: { th: "ถูกไฮไลท์แล้ว!", en: "has been highlighted!" },

  // Profile
  career_score_label: { th: "คะแนนอาชีพ", en: "Career Score" },
  skills_expertise: { th: "ทักษะและความเชี่ยวชาญ", en: "Skills & Expertise" },
  work_experience: { th: "ประสบการณ์การทำงาน", en: "Work Experience" },
  education: { th: "การศึกษา", en: "Education" },
  portfolio_projects: { th: "ผลงานและโปรเจกต์", en: "Portfolio & Projects" },
  view_my_resume: { th: "ดูเรซูเม่ของฉัน", en: "View My Resume" },
  edit_full_profile: { th: "แก้ไขโปรไฟล์ทั้งหมด", en: "Edit Full Profile" },
  applied: { th: "สมัครแล้ว", en: "Applied" },

  // Saved
  no_saved_jobs: { th: "ไม่มีงานที่บันทึก", en: "No Saved Jobs" },
  saved_jobs_hint: { th: "งานที่คุณบันทึกจะปรากฏที่นี่", en: "Jobs you save will appear here for quick access" },
  browse_jobs: { th: "เรียกดูงาน", en: "Browse Jobs" },

  // Notifications
  new_notifications: { th: "การแจ้งเตือนใหม่", en: "new notifications" },
  all_caught_up_notif: { th: "ดูหมดแล้ว!", en: "All caught up!" },
  mark_all_read: { th: "อ่านทั้งหมด", en: "Mark all read" },

  // Interviews
  upcoming_interviews: { th: "สัมภาษณ์ที่กำลังจะมา", en: "Upcoming Interviews" },
  upcoming: { th: "กำลังจะมา", en: "Upcoming" },
  prepare: { th: "เตรียมตัว", en: "Prepare" },
  join_meeting: { th: "เข้าร่วมประชุม", en: "Join Meeting" },
  past_interviews: { th: "สัมภาษณ์ที่ผ่านมา", en: "Past Interviews" },
  done: { th: "เสร็จสิ้น", en: "Done" },
  application_tracker: { th: "ติดตามใบสมัคร", en: "Application Tracker" },

  // Personality
  step_of: { th: "ขั้นตอนที่", en: "Step" },
  of: { th: "จาก", en: "of" },
  work_style_title: { th: "สไตล์การทำงานของคุณคือ?", en: "What's Your Work Style?" },
  work_style_subtitle: { th: "เลือกสภาพแวดล้อมที่เหมาะกับคุณ เพื่อช่วยจับคู่งานที่ใช่", en: "Choose the environment where you thrive best. This helps us match you with the right jobs." },
  startup: { th: "สตาร์ทอัพ", en: "Startup" },
  startup_desc: { th: "สภาพแวดล้อมที่เร็ว สร้างสรรค์ ยืดหยุ่น มีศักยภาพเติบโตสูง", en: "Fast-paced, creative, flexible environment with high growth potential" },
  corporate: { th: "องค์กร", en: "Corporate" },
  corporate_desc: { th: "เส้นทางอาชีพที่มั่นคง มีระบบและสวัสดิการชัดเจน", en: "Structured, stable career path with established processes and benefits" },
  remote: { th: "ทำงานทางไกล", en: "Remote" },
  remote_desc: { th: "ทำงานจากที่ไหนก็ได้ ยืดหยุ่น ใช้เครื่องมือดิจิทัล", en: "Work from anywhere with flexibility and digital collaboration tools" },
  freelance: { th: "ฟรีแลนซ์", en: "Freelance" },
  freelance_desc: { th: "เป็นเจ้านายตัวเอง เลือกโปรเจกต์ กำหนดตารางเอง", en: "Be your own boss, choose your projects, and set your own schedule" },
  interests_title: { th: "คุณสนใจอะไร?", en: "What Are You Interested In?" },
  interests_subtitle: { th: "เลือกสิ่งที่คุณสนใจมากที่สุด อย่างน้อย 1 อย่าง", en: "Select the areas you're most passionate about. Pick at least one." },
  frontend_dev: { th: "พัฒนา Frontend", en: "Frontend Development" },
  backend_dev: { th: "พัฒนา Backend", en: "Backend Development" },
  mobile_dev: { th: "พัฒนา Mobile", en: "Mobile Development" },
  data_science: { th: "วิทยาศาสตร์ข้อมูล", en: "Data Science" },
  ui_ux_design: { th: "ออกแบบ UI/UX", en: "UI/UX Design" },
  devops_cloud: { th: "DevOps & Cloud", en: "DevOps & Cloud" },
  find_my_jobs: { th: "ค้นหางานของฉัน", en: "Find My Jobs" },

  // Job Detail
  ai_match_score: { th: "คะแนน AI จับคู่", en: "AI Match Score" },
  job_description: { th: "รายละเอียดงาน", en: "Job Description" },
  requirements: { th: "คุณสมบัติที่ต้องการ", en: "Requirements" },
  required_skills: { th: "ทักษะที่จำเป็น", en: "Required Skills" },
  benefits_perks: { th: "สวัสดิการและสิทธิประโยชน์", en: "Benefits & Perks" },
  apply_now: { th: "สมัครเลย", en: "Apply Now" },
  save_job: { th: "บันทึกงาน", en: "Save Job" },

  // Apply
  personal_info: { th: "ข้อมูลส่วนตัว", en: "Personal Information" },
  full_name: { th: "ชื่อ-นามสกุล", en: "Full Name" },
  enter_full_name: { th: "กรอกชื่อ-นามสกุล", en: "Enter your full name" },
  email_address: { th: "อีเมล", en: "Email Address" },
  enter_email: { th: "กรอกอีเมล", en: "Enter your email" },
  phone_number: { th: "เบอร์โทรศัพท์", en: "Phone Number" },
  enter_phone: { th: "กรอกเบอร์โทร", en: "Enter your phone" },
  cover_letter: { th: "จดหมายสมัครงาน", en: "Cover Letter" },
  cover_letter_hint: { th: "บอกนายจ้างว่าทำไมคุณถึงเหมาะกับตำแหน่งนี้", en: "Tell the employer why you're a great fit for this role" },
  write_cover_letter: { th: "เขียนจดหมายสมัครงาน...", en: "Write your cover letter..." },
  resume: { th: "เรซูเม่", en: "Resume" },
  tap_to_view: { th: "แตะเพื่อดู/แก้ไขเรซูเม่", en: "Tap to view/edit your resume" },
  submit_application: { th: "ส่งใบสมัคร", en: "Submit Application" },
  fill_name_email: { th: "กรุณากรอกชื่อและอีเมล", en: "Please fill in your name and email" },
  valid_email: { th: "กรุณากรอกอีเมลที่ถูกต้อง", en: "Please enter a valid email address" },
  application_submitted: { th: "ส่งใบสมัครแล้ว!", en: "Application Submitted!" },
  match_score: { th: "คะแนนตรงกัน", en: "Match Score" },
  review_days: { th: "วันพิจารณา", en: "Review Days" },
  back_to_jobs: { th: "กลับไปดูงาน", en: "Back to Jobs" },
  view_my_applications: { th: "ดูใบสมัครของฉัน", en: "View My Applications" },

  // Edit Profile
  edit_your_profile: { th: "แก้ไขโปรไฟล์", en: "Edit Your Profile" },
  complete_profile_hint: { th: "กรอกโปรไฟล์ให้ครบเพื่อจับคู่งานได้ดีขึ้น", en: "Complete your profile to attract better job matches" },
  permission_needed: { th: "ต้องการสิทธิ์", en: "Permission Needed" },
  gallery_permission_msg: { th: "กรุณาอนุญาตให้เข้าถึงคลังรูปภาพ", en: "Please allow access to your photo library" },
  pdf_permission_msg: { th: "กรุณาอนุญาตให้เข้าถึงไฟล์เอกสาร", en: "Please allow access to documents" },
  upload_resume_pdf: { th: "อัปโหลด Resume (PDF)", en: "Upload Resume (PDF)" },
  resume_uploaded: { th: "อัปโหลดสำเร็จ", en: "Resume Uploaded" },
  resume_uploaded_msg: { th: "ไฟล์ Resume ถูกอัปโหลดแล้ว", en: "Your resume PDF has been uploaded" },
  remove_pdf: { th: "ลบไฟล์ PDF", en: "Remove PDF" },
  basic_info: { th: "ข้อมูลพื้นฐาน", en: "Basic Information" },
  job_title: { th: "ตำแหน่งงาน", en: "Job Title" },
  email: { th: "อีเมล", en: "Email" },
  phone: { th: "โทรศัพท์", en: "Phone" },
  location: { th: "สถานที่", en: "Location" },
  bio: { th: "ประวัติย่อ", en: "Bio" },
  add_skill_placeholder: { th: "เพิ่มทักษะ...", en: "Add skill..." },
  add_experience: { th: "เพิ่มประสบการณ์", en: "Add Experience" },
  company: { th: "บริษัท", en: "Company" },
  period: { th: "ช่วงเวลา", en: "Period" },
  description: { th: "รายละเอียด", en: "Description" },
  current_experiences: { th: "ประสบการณ์ปัจจุบัน", en: "Current Experiences" },
  add_project: { th: "เพิ่มโปรเจกต์", en: "Add Project" },
  add_project_portfolio: { th: "เพิ่มโปรเจกต์ / ผลงาน", en: "Add Project / Portfolio" },
  project_title: { th: "ชื่อโปรเจกต์", en: "Project Title" },
  tags_comma: { th: "แท็ก (คั่นด้วยคอมม่า)", en: "Tags (comma separated)" },
  save_changes: { th: "บันทึกการเปลี่ยนแปลง", en: "Save Changes" },
  enter_job_company: { th: "กรุณากรอกตำแหน่งงานและบริษัท", en: "Please enter job title and company" },
  experience_added: { th: "เพิ่มประสบการณ์แล้ว!", en: "Experience added successfully!" },
  enter_project_title: { th: "กรุณากรอกชื่อโปรเจกต์", en: "Please enter project title" },
  project_added: { th: "เพิ่มโปรเจกต์แล้ว!", en: "Project added successfully!" },
  profile_saved: { th: "บันทึกแล้ว", en: "Saved" },
  profile_updated: { th: "อัปเดตโปรไฟล์แล้ว!", en: "Profile updated successfully!" },

  // Resume
  contact_info: { th: "ข้อมูลติดต่อ", en: "Contact Information" },
  website: { th: "เว็บไซต์", en: "Website" },
  professional_summary: { th: "สรุปความเป็นมืออาชีพ", en: "Professional Summary" },
  summary: { th: "สรุป", en: "Summary" },
  skills: { th: "ทักษะ", en: "Skills" },
  add_new_skill: { th: "เพิ่มทักษะใหม่...", en: "Add new skill..." },
  languages: { th: "ภาษา", en: "Languages" },
  level: { th: "ระดับ", en: "Level" },
  certifications: { th: "ใบรับรอง", en: "Certifications" },
  cert_name: { th: "ชื่อใบรับรอง", en: "Cert Name" },
  issuer: { th: "ผู้ออก", en: "Issuer" },
  year: { th: "ปี", en: "Year" },
  remove_skill: { th: "ลบทักษะ", en: "Remove Skill" },
  remove_skill_confirm: { th: "ลบทักษะนี้?", en: "Remove this skill?" },

  // Login
  welcome_back: { th: "ยินดีต้อนรับกลับ", en: "Welcome Back" },
  sign_in_subtitle: { th: "เข้าสู่ระบบเพื่อเริ่มต้นเส้นทางอาชีพ", en: "Sign in to continue your career journey" },
  email_placeholder: { th: "อีเมล", en: "Email address" },
  password_placeholder: { th: "รหัสผ่าน", en: "Password" },
  forgot_password: { th: "ลืมรหัสผ่าน?", en: "Forgot Password?" },
  enter_email_password: { th: "กรุณากรอกอีเมลและรหัสผ่าน", en: "Please enter email and password" },
  invalid_email_password: { th: "อีเมลหรือรหัสผ่านไม่ถูกต้อง", en: "Invalid email or password" },
  sign_in: { th: "เข้าสู่ระบบ", en: "Sign In" },
  or_continue_with: { th: "หรือดำเนินการด้วย", en: "or continue with" },
  continue_google: { th: "ดำเนินการด้วย Google", en: "Continue with Google" },
  continue_facebook: { th: "ดำเนินการด้วย Facebook", en: "Continue with Facebook" },
  continue_github: { th: "ดำเนินการด้วย GitHub", en: "Continue with GitHub" },
  sign_in_to_account: { th: "เข้าสู่ระบบบัญชีของคุณ", en: "Sign in to your Account" },
  social_login_success: { th: "เข้าสู่ระบบสำเร็จ!", en: "Login successful!" },
  no_account: { th: "ยังไม่มีบัญชี? ", en: "Don't have an account? " },
  register: { th: "สมัครสมาชิก", en: "Register" },

  // Register
  create_account: { th: "สร้างบัญชี", en: "Create Account" },
  start_journey: { th: "เริ่มต้นเส้นทางอาชีพวันนี้", en: "Start your career journey today" },
  personal_info_step: { th: "ข้อมูลส่วนตัว", en: "Personal Info" },
  security: { th: "ความปลอดภัย", en: "Security" },
  first_name: { th: "ชื่อ", en: "First Name" },
  last_name: { th: "นามสกุล", en: "Last Name" },
  phone_placeholder: { th: "เบอร์โทรศัพท์", en: "Phone number" },
  create_password: { th: "สร้างรหัสผ่าน", en: "Create password" },
  confirm_password: { th: "ยืนยันรหัสผ่าน", en: "Confirm password" },
  weak: { th: "อ่อน", en: "Weak" },
  good: { th: "ดี", en: "Good" },
  strong: { th: "แข็งแรง", en: "Strong" },
  passwords_match: { th: "รหัสผ่านตรงกัน", en: "Passwords match" },
  passwords_no_match: { th: "รหัสผ่านไม่ตรงกัน", en: "Passwords do not match" },
  agree_terms: { th: "ฉันยอมรับ ", en: "I agree to the " },
  terms_of_service: { th: "ข้อกำหนดการใช้งาน", en: "Terms of Service" },
  privacy_policy: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
  enter_full_name_alert: { th: "กรุณากรอกชื่อ-นามสกุล", en: "Please enter your full name" },
  valid_email_alert: { th: "กรุณากรอกอีเมลที่ถูกต้อง", en: "Please enter a valid email address" },
  valid_phone_alert: { th: "กรุณากรอกเบอร์โทรที่ถูกต้อง", en: "Please enter a valid phone number" },
  password_min_6: { th: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร", en: "Password must be at least 6 characters" },
  accept_terms: { th: "กรุณายอมรับข้อกำหนดและเงื่อนไข", en: "Please accept the Terms & Conditions" },
  welcome_title: { th: "ยินดีต้อนรับ! 🎉", en: "Welcome! 🎉" },
  account_created: { th: "สร้างบัญชีเรียบร้อยแล้ว", en: "Your account has been created successfully." },
  have_account: { th: "มีบัญชีอยู่แล้ว? ", en: "Already have an account? " },

  // Splash
  smart_career: { th: "Smart Career", en: "Smart Career" },
  find_dream_job: { th: "ค้นหางานในฝัน", en: "Find Your Dream Job" },

  // Onboarding
  skip: { th: "ข้าม", en: "Skip" },
  next: { th: "ถัดไป", en: "Next" },
  get_started: { th: "เริ่มต้นใช้งาน", en: "Get Started" },
  onboard_title_1: { th: "ค้นหางานที่เหมาะกับคุณ", en: "Find the Right Job for You" },
  onboard_sub_1: { th: "เราจะช่วยหางานที่ตรงกับทักษะและความสนใจของคุณ ไม่ต้องเสียเวลาค้นหาเอง", en: "We'll help match jobs with your skills and interests. Stop wasting time browsing endlessly." },
  onboard_title_2: { th: "AI จับคู่งานอัจฉริยะ", en: "Smart AI Job Matching" },
  onboard_sub_2: { th: "ระบบ AI วิเคราะห์โปรไฟล์ของคุณ แล้วแนะนำงานที่ตรงที่สุด พร้อมบอกเหตุผลว่าทำไมถึง match", en: "Our AI analyzes your profile and recommends the best-fit jobs, explaining why you match." },
  onboard_title_3: { th: "สมัครง่าย ติดตามได้", en: "Easy Apply, Track Progress" },
  onboard_sub_3: { th: "สมัครงานได้ใน 1 คลิก ติดตามสถานะแบบ real-time ตั้งแต่สมัครจนถึงสัมภาษณ์", en: "Apply in one click and track your application status in real-time from submission to interview." },
  onboard_choice_seeker: { th: "ค้นหางาน", en: "Find a Job" },
  onboard_choice_employer: { th: "หาคนทำงาน", en: "Hire Talent" },

  // Demo
  try_demo: { th: "🚀 ทดลองใช้งาน Demo", en: "🚀 Try Demo Mode" },

  // Dashboard
  dashboard: { th: "แดชบอร์ด", en: "Dashboard" },
  dash_hello: { th: "สวัสดี", en: "Hello" },
  dash_ready: { th: "พร้อมหางานวันนี้ไหม?", en: "Ready to find your next job?" },
  dash_overview: { th: "ภาพรวม", en: "Overview" },
  dash_quick_actions: { th: "ทางลัด", en: "Quick Actions" },
  dash_recent: { th: "กิจกรรมล่าสุด", en: "Recent Activity" },
  dash_success_rate: { th: "อัตราสำเร็จ", en: "Success Rate" },
  dash_score_hint: { th: "เพิ่ม skill เพื่อเพิ่มคะแนน", en: "Add more skills to improve your score" },
  search_ai_placeholder: { th: "ค้นหางาน ทักษะ หรือบริษัท...", en: "Search jobs, skills, or companies..." },
  dash_activity_applied: { th: "ส่งใบสมัครแล้ว", en: "Application Submitted" },
  dash_activity_viewed: { th: "HR ดูโปรไฟล์", en: "HR Viewed Profile" },
  dash_activity_interview: { th: "นัดสัมภาษณ์", en: "Interview Scheduled" },
  dash_2days_ago: { th: "2 วันก่อน", en: "2d ago" },
  dash_1day_ago: { th: "1 วันก่อน", en: "1d ago" },
  dash_3days_ago: { th: "3 วันก่อน", en: "3d ago" },

  // Chat
  chat_hr: { th: "แชท HR", en: "Chat HR" },
  chat_online: { th: "ออนไลน์", en: "Online" },
  chat_typing: { th: "กำลังพิมพ์...", en: "Typing..." },
  chat_placeholder: { th: "พิมพ์ข้อความ...", en: "Type a message..." },

  // Applications
  my_applications: { th: "ใบสมัครของฉัน", en: "My Applications" },
  app_total: { th: "ทั้งหมด", en: "Total" },
  app_interviewing: { th: "สัมภาษณ์", en: "Interviewing" },
  app_accepted: { th: "ผ่าน", en: "Accepted" },
  app_pending: { th: "รอดำเนินการ", en: "Pending" },
  app_empty_title: { th: "ยังไม่มีใบสมัคร", en: "No Applications Yet" },
  app_empty_sub: { th: "เริ่มสมัครงานเพื่อติดตามสถานะได้ที่นี่", en: "Start applying for jobs to track your status here" },
  status_applied: { th: "สมัครแล้ว", en: "Applied" },
  status_viewed: { th: "HR ดูแล้ว", en: "Viewed" },
  status_interview: { th: "นัดสัมภาษณ์", en: "Interview" },
  status_accepted: { th: "ผ่าน", en: "Accepted" },
  status_rejected: { th: "ไม่ผ่าน", en: "Rejected" },

  // Settings
  settings_preferences: { th: "การตั้งค่า", en: "Preferences" },
  dark_mode: { th: "โหมดมืด", en: "Dark Mode" },
  push_notifications: { th: "การแจ้งเตือน Push", en: "Push Notifications" },
  settings_about: { th: "เกี่ยวกับ", en: "About" },
  settings_version: { th: "เวอร์ชัน", en: "Version" },

  // --- Company Portal ---
  stat_jobs: { th: "งานที่เปิดรับ", en: "Active Jobs" },
  stat_apps: { th: "ใบสมัครทั้งหมด", en: "Total Applications" },
  stat_pending: { th: "รอดำเนินการ", en: "Pending Reviews" },
  stat_accepted: { th: "ตอบรับแล้ว", en: "Accepted" },
  dash_trends: { th: "แนวโน้มใบสมัคร", en: "Application Trends" },
  dash_recent_apps: { th: "ใบสมัครล่าสุด", en: "Recent Applications" },
  see_all: { th: "ดูทั้งหมด", en: "See All" },

  manage_jobs_title: { th: "งานของฉัน", en: "My Jobs" },
  manage_jobs_sub: { th: "จัดการประกาศงานของคุณ", en: "Manage your job piercings" },
  search_jobs: { th: "ค้นหางาน...", en: "Search jobs..." },
  add_new_job: { th: "สร้างประกาศงาน", en: "Post a Job" },
  edit_job: { th: "แก้ไขงาน", en: "Edit Job" },
  delete_job: { th: "ลบงาน", en: "Delete Job" },
  job_type_full_time: { th: "งานประจำ", en: "Full-time" },
  job_type_part_time: { th: "พาร์ทไทม์", en: "Part-time" },
  job_type_contract: { th: "สัญญาจ้าง", en: "Contract" },
  job_type_internship: { th: "ฝึกงาน", en: "Internship" },
  remote_onsite: { th: "Onsite", en: "Onsite" },
  remote_remote: { th: "Remote", en: "Remote" },
  remote_hybrid: { th: "Hybrid", en: "Hybrid" },
  salary_negotiable: { th: "ตามตกลง", en: "Negotiable" },
  exp_entry: { th: "ระดับเริ่มต้น", en: "Entry Level" },
  exp_mid: { th: "ระดับกลาง", en: "Mid Level" },
  exp_senior: { th: "ระดับอาวุโส", en: "Senior Level" },

  applicants_title: { th: "ผู้สมัคร", en: "Applicants" },
  applicants_sub: { th: "ตรวจสอบใบสมัครงาน", en: "Review candidate applications" },
  search_applicants: { th: "ค้นหาผู้สมัคร...", en: "Search applicants..." },
  shortlist: { th: "เพิ่มลงคัดเลือก", en: "Shortlist" },
  change_status: { th: "เปลี่ยนสถานะ", en: "Change Status" },

  comp_profile_title: { th: "โปรไฟล์บริษัท", en: "Company Profile" },
  comp_profile_sub: { th: "จัดการข้อมูลองค์กร", en: "Manage organization info" },
  upload_logo: { th: "อัปโหลดโลโก้", en: "Upload Logo" },
  company_name_label: { th: "ชื่อบริษัท", en: "Company Name" },
  industry_label: { th: "อุตสาหกรรม", en: "Industry" },
  location_label: { th: "ที่ตั้ง", en: "Location" },
  about_company: { th: "เกี่ยวกับบริษัท", en: "About Company" },
  website_label: { th: "เว็บไซต์", en: "Website" },
  contact_email_label: { th: "อีเมลติดต่อ", en: "Contact Email" },
  contact_phone_label: { th: "เบอร์โทรติดต่อ", en: "Contact Phone" },
  save_profile_btn: { th: "บันทึกโปรไฟล์", en: "Save Profile" },

  comp_login_title: { th: "พอร์ทัลผู้ประกอบการ", en: "Employer Portal" },
  comp_welcome: { th: "ค้นหาบุคคลากรที่ดีที่สุด", en: "Hire the Best Talent" },
  comp_login_sub: { th: "จัดการงานและใบสมัครของคุณในที่เดียว", en: "Manage your jobs and applicants in one place." },
  comp_login_btn: { th: "เข้าสู่ระบบบริษัท", en: "Employer Login" },
  new_company: { th: "บริษัทใหม่? ", en: "New company? " },

  status_active: { th: "เปิดรับ", en: "Active" },
  status_closed: { th: "ปิดรับ", en: "Closed" },
  status_reviewing: { th: "กำลังพิจารณา", en: "Reviewing" },
  status_interview: { th: "นัดสัมภาษณ์", en: "Interview" },
  status_pending: { th: "รอดำเนินการ", en: "Pending" },
  status_accepted: { th: "ตอบรับแล้ว", en: "Accepted" },
  status_rejected: { th: "ปฏิเสธ", en: "Rejected" },

  dash_ready: { th: "พร้อมรับคนเข้าทำงานหรือยัง?", en: "Ready to hire today?" },
  app_total: { th: "ใบสมัคร", en: "Total" },
  job_title: { th: "ชื่อตำแหน่งงาน", en: "Job Title" },
  job_description: { th: "รายละเอียดงาน", en: "Job Description" },
  requirements: { th: "คุณสมบัติ", en: "Requirements" },
  save: { th: "บันทึก", en: "Save" },
  add: { th: "เพิ่ม", en: "Add" },
  no_saved_jobs: { th: "ยังไม่มีประกาศงาน", en: "No job postings yet" },
  app_empty_title: { th: "ยังไม่มีผู้สมัคร", en: "No applicants yet" },
  profile_saved: { th: "บันทึกสำเร็จ", en: "Saved Successfully" },
  profile_updated: { th: "ข้อมูลโปรไฟล์อัปเดตแล้ว", en: "Profile info has been updated." },
  cancel: { th: "ยกเลิก", en: "Cancel" },
  language: { th: "ภาษา", en: "Language" },
  security: { th: "ความปลอดภัย", en: "Security" },
  sign_out: { th: "ออกจากระบบ", en: "Sign Out" },
  auth_divider: { th: "หรือเข้าใช้ด้วย", en: "or continue with" },
};

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = (key) => {
    if (dictionary[key]) {
      return dictionary[key][lang];
    }
    return key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
