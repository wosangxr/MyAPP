export const MOCK = {
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
