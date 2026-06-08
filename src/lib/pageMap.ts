// ─── PAGE MAP ────────────────────────────────────────────────────────────────
// Every sidebar key maps to: { title, subtitle, role }
// Add your page components here as you build them.

export type PageRole = "student" | "faculty" | "admin";

export type PageMeta = {
  title: string;
  subtitle?: string;
  role: PageRole;
};

export const PAGE_MAP: Record<string, PageMeta> = {
  // ── STUDENT ──────────────────────────────────────────────────────────
  "student-dashboard": {
    title: "Student Dashboard",
    subtitle: "Your learning overview",
    role: "student",
  },
  "student-notifications": {
    title: "Notifications",
    subtitle: "Stay updated",
    role: "student",
  },
  "student-vacancies": {
    title: "AIIMS Vacancies",
    subtitle: "Latest AIIMS CRE vacancy notifications",
    role: "student",
  },
  "student-courses": {
    title: "My Courses",
    subtitle: "Enrolled courses",
    role: "student",
  },
  "student-videos": {
    title: "Video Lectures",
    subtitle: "Watch and learn",
    role: "student",
  },
  "student-material": {
    title: "Study Material",
    subtitle: "PDFs & notes",
    role: "student",
  },
  "student-current-affairs": {
    title: "Current Affairs",
    subtitle: "Stay updated with daily current affairs",
    role: "student",
  },
  "student-pyq": {
    title: "Previous Year Papers",
    subtitle: "Practice with past exam questions",
    role: "student",
  },
  "student-tests": {
    title: "Test Series",
    subtitle: "Mock & live tests",
    role: "student",
  },
  "student-exam": {
    title: "Online Exam",
    subtitle: "Take exams with auto-save & timer",
    role: "student",
  },
  "student-test-analysis": {
    title: "Test Analysis",
    subtitle: "Detailed answer review",
    role: "student",
  },
  "student-performance": {
    title: "Performance Dashboard",
    subtitle: "AI-powered performance insights",
    role: "student",
  },
  "student-quiz": {
    title: "Daily Quiz",
    subtitle: "Quick 10-question daily quiz",
    role: "student",
  },
  "student-leaderboard": {
    title: "Leaderboard",
    subtitle: "See where you rank",
    role: "student",
  },
  "student-ai-tools": {
    title: "AI Study Tools",
    subtitle: "AI-powered learning assistant",
    role: "student",
  },
  "student-doubts": {
    title: "Doubt Forum",
    subtitle: "Ask & get answers",
    role: "student",
  },
  "student-profile": {
    title: "My Profile",
    subtitle: "View & edit your profile",
    role: "student",
  },
  "student-payments": {
    title: "Payments & Orders",
    subtitle: "Billing & purchase history",
    role: "student",
  },
  "student-referral": {
    title: "Referral & Rewards",
    subtitle: "Earn rewards by referring friends",
    role: "student",
  },
  "student-certificates": {
    title: "Certificates",
    subtitle: "Your earned certificates",
    role: "student",
  },
  "student-settings": {
    title: "Settings",
    subtitle: "Account & preferences",
    role: "student",
  },

  // ── FACULTY ──────────────────────────────────────────────────────────
  "faculty-dashboard": {
    title: "Faculty Dashboard",
    subtitle: "Overview of your teaching activity",
    role: "faculty",
  },
  "faculty-notifications": {
    title: "Notifications",
    subtitle: "Faculty alerts & updates",
    role: "faculty",
  },
  "faculty-courses": {
    title: "Course Management",
    subtitle: "Create & manage your courses",
    role: "faculty",
  },
  "faculty-videos": {
    title: "Video Library",
    subtitle: "Upload & organize lectures",
    role: "faculty",
  },
  "faculty-pdfs": {
    title: "PDF & Notes",
    subtitle: "Upload study materials",
    role: "faculty",
  },
  "faculty-questions": {
    title: "Question Bank",
    subtitle: "Manage questions & answers",
    role: "faculty",
  },
  "faculty-ai": {
    title: "AI Content Assistant",
    subtitle: "AI-powered content generation",
    role: "faculty",
  },
  "faculty-tests": {
    title: "Test Management",
    subtitle: "Create & manage tests",
    role: "faculty",
  },
  "faculty-live-tests": {
    title: "Live Tests",
    subtitle: "Schedule & run live tests",
    role: "faculty",
  },
  "faculty-quiz": {
    title: "Daily Quiz",
    subtitle: "Create daily quiz questions",
    role: "faculty",
  },
  "faculty-student-progress": {
    title: "Student Progress",
    subtitle: "Monitor your students",
    role: "faculty",
  },
  "faculty-doubts": {
    title: "Doubt Management",
    subtitle: "Answer student doubts",
    role: "faculty",
  },
  "faculty-live-classes": {
    title: "Live Classes",
    subtitle: "Schedule & host live sessions",
    role: "faculty",
  },
  "faculty-assignments": {
    title: "Assignments",
    subtitle: "Create & grade assignments",
    role: "faculty",
  },
  "faculty-attendance": {
    title: "Attendance",
    subtitle: "Track student attendance",
    role: "faculty",
  },
  "faculty-forum": {
    title: "Discussion Forum",
    subtitle: "Engage with students",
    role: "faculty",
  },
  "faculty-reports": {
    title: "Reports & Analytics",
    subtitle: "Student performance reports",
    role: "faculty",
  },
  "faculty-certificates": {
    title: "Certificate Approval",
    subtitle: "Approve student certificates",
    role: "faculty",
  },
  "faculty-resources": {
    title: "Resource Downloads",
    subtitle: "Manage downloadable resources",
    role: "faculty",
  },
  "faculty-profile": {
    title: "Faculty Profile",
    subtitle: "Your profile information",
    role: "faculty",
  },
  "faculty-settings": {
    title: "Faculty Settings",
    subtitle: "Account & notification preferences",
    role: "faculty",
  },

  // ── ADMIN ─────────────────────────────────────────────────────────────
  "admin-dashboard": {
    title: "Super Admin Dashboard",
    subtitle: "Platform-wide overview",
    role: "admin",
  },
  "admin-reports": {
    title: "Reports & Analytics",
    subtitle: "Revenue, users, performance",
    role: "admin",
  },
  "admin-audit": {
    title: "Audit Logs",
    subtitle: "System activity & security",
    role: "admin",
  },
  "admin-students": {
    title: "Student Management",
    subtitle: "View, edit & manage all students",
    role: "admin",
  },
  "admin-faculty": {
    title: "Faculty Management",
    subtitle: "Manage faculty accounts",
    role: "admin",
  },
  "admin-admins": {
    title: "Admin Management",
    subtitle: "Manage admin accounts",
    role: "admin",
  },
  "admin-roles": {
    title: "Roles & Permissions",
    subtitle: "Role-based access control",
    role: "admin",
  },
  "admin-vacancies": {
    title: "Vacancy Management",
    subtitle: "Add & manage AIIMS vacancies",
    role: "admin",
  },
  "admin-courses": {
    title: "Course Management",
    subtitle: "All platform courses",
    role: "admin",
  },
  "admin-material": {
    title: "Study Material",
    subtitle: "PDFs, notes & resources",
    role: "admin",
  },
  "admin-questions": {
    title: "Question Bank",
    subtitle: "All questions across subjects",
    role: "admin",
  },
  "admin-tests": {
    title: "Test Management",
    subtitle: "Mock tests & live exams",
    role: "admin",
  },
  "admin-current-affairs": {
    title: "Current Affairs",
    subtitle: "Add & manage daily current affairs",
    role: "admin",
  },
  "admin-blogs": {
    title: "Blog Management",
    subtitle: "Articles & announcements",
    role: "admin",
  },
  "admin-payments": {
    title: "Payment Management",
    subtitle: "Revenue & transactions",
    role: "admin",
  },
  "admin-coupons": {
    title: "Coupons",
    subtitle: "Discount codes & offers",
    role: "admin",
  },
  "admin-referrals": {
    title: "Referral Management",
    subtitle: "Track referrals & rewards",
    role: "admin",
  },
  "admin-notifications": {
    title: "Notification Center",
    subtitle: "Push & email notifications",
    role: "admin",
  },
  "admin-banners": {
    title: "Banner Management",
    subtitle: "Homepage & app banners",
    role: "admin",
  },
  "admin-certificates": {
    title: "Certificate Management",
    subtitle: "Issue & manage certificates",
    role: "admin",
  },
  "admin-cms": {
    title: "CMS Management",
    subtitle: "Website content management",
    role: "admin",
  },
  "admin-seo": {
    title: "SEO Management",
    subtitle: "Meta tags & search optimization",
    role: "admin",
  },
  "admin-settings": {
    title: "Website Settings",
    subtitle: "Global platform configuration",
    role: "admin",
  },
  "admin-security": {
    title: "Security",
    subtitle: "2FA, sessions & access control",
    role: "admin",
  },
  "admin-backup": {
    title: "Backup & Restore",
    subtitle: "Database backup management",
    role: "admin",
  },
};
