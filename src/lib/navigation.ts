import {
  LayoutDashboard,
  LogIn,
  User,
  Briefcase,
  BookOpen,
  Video,
  FileText,
  ClipboardList,
  Monitor,
  BarChart2,
  TrendingUp,
  Archive,
  Newspaper,
  Trophy,
  MessageCircle,
  Sparkles,
  Bell,
  CreditCard,
  Gift,
  Settings,
  Users,
  Shield,
  FlaskConical,
  GraduationCap,
  Upload,
  LayoutTemplate,
  PieChart,
  Radio,
  HelpCircle,
  Calendar,
  CheckSquare,
  Mail,
  Image,
  Globe,
  Lock,
  Database,
  BadgeCheck,
  Tag,
  Search,
  FilePlus,
  Activity,
  DollarSign,
  Layers,
} from "lucide-react";

export type NavItem = {
  label: string;
  key: string;
  icon: any;
  badge?: number | string;
  children?: NavItem[];
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

// ─── STUDENT PANEL ───────────────────────────────────────────
export const studentNav: NavGroup[] = [
  {
    group: "Home",
    items: [
      { label: "Dashboard", key: "student-dashboard", icon: LayoutDashboard },
      { label: "Notifications", key: "student-notifications", icon: Bell, badge: 3 },
    ],
  },
  {
    group: "Exam Prep",
    items: [
      { label: "AIIMS Vacancies", key: "student-vacancies", icon: Briefcase },
      { label: "My Courses", key: "student-courses", icon: BookOpen },
      { label: "Video Lectures", key: "student-videos", icon: Video },
      { label: "Study Material", key: "student-material", icon: FileText },
      { label: "Current Affairs", key: "student-current-affairs", icon: Newspaper },
      { label: "Previous Year Papers", key: "student-pyq", icon: Archive },
    ],
  },
  {
    group: "Tests & Analysis",
    items: [
      { label: "Test Series", key: "student-tests", icon: ClipboardList },
      { label: "Online Exam", key: "student-exam", icon: Monitor },
      { label: "Test Analysis", key: "student-test-analysis", icon: BarChart2 },
      { label: "Performance", key: "student-performance", icon: TrendingUp },
      { label: "Daily Quiz", key: "student-quiz", icon: FlaskConical },
      { label: "Leaderboard", key: "student-leaderboard", icon: Trophy },
    ],
  },
  {
    group: "AI Tools",
    items: [
      { label: "AI Study Tools", key: "student-ai-tools", icon: Sparkles },
      { label: "Doubt Forum", key: "student-doubts", icon: MessageCircle },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "My Profile", key: "student-profile", icon: User },
      { label: "Payments & Orders", key: "student-payments", icon: CreditCard },
      { label: "Referral & Rewards", key: "student-referral", icon: Gift },
      { label: "Certificates", key: "student-certificates", icon: BadgeCheck },
      { label: "Settings", key: "student-settings", icon: Settings },
    ],
  },
];

// ─── FACULTY PANEL ────────────────────────────────────────────
export const facultyNav: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", key: "faculty-dashboard", icon: LayoutDashboard },
      { label: "Notifications", key: "faculty-notifications", icon: Bell, badge: 2 },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Course Management", key: "faculty-courses", icon: BookOpen },
      { label: "Video Library", key: "faculty-videos", icon: Video },
      { label: "PDF & Notes", key: "faculty-pdfs", icon: FileText },
      { label: "Question Bank", key: "faculty-questions", icon: Database },
      { label: "AI Content Assistant", key: "faculty-ai", icon: Sparkles },
    ],
  },
  {
    group: "Tests",
    items: [
      { label: "Test Management", key: "faculty-tests", icon: ClipboardList },
      { label: "Live Tests", key: "faculty-live-tests", icon: Radio },
      { label: "Daily Quiz", key: "faculty-quiz", icon: FlaskConical },
    ],
  },
  {
    group: "Students",
    items: [
      { label: "Student Progress", key: "faculty-student-progress", icon: TrendingUp },
      { label: "Doubt Management", key: "faculty-doubts", icon: HelpCircle },
      { label: "Live Classes", key: "faculty-live-classes", icon: Monitor },
      { label: "Assignments", key: "faculty-assignments", icon: CheckSquare },
      { label: "Attendance", key: "faculty-attendance", icon: Calendar },
      { label: "Discussion Forum", key: "faculty-forum", icon: MessageCircle },
    ],
  },
  {
    group: "Reports",
    items: [
      { label: "Reports & Analytics", key: "faculty-reports", icon: PieChart },
      { label: "Certificate Approval", key: "faculty-certificates", icon: BadgeCheck },
      { label: "Resource Downloads", key: "faculty-resources", icon: Upload },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Faculty Profile", key: "faculty-profile", icon: User },
      { label: "Settings", key: "faculty-settings", icon: Settings },
    ],
  },
];

// ─── SUPER ADMIN PANEL ────────────────────────────────────────
export const adminNav: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", key: "admin-dashboard", icon: LayoutDashboard },
      { label: "Reports & Analytics", key: "admin-reports", icon: PieChart },
      { label: "Audit Logs", key: "admin-audit", icon: Activity },
    ],
  },
  {
    group: "Users",
    items: [
      { label: "Student Management", key: "admin-students", icon: GraduationCap },
      { label: "Faculty Management", key: "admin-faculty", icon: Users },
      { label: "Admin Management", key: "admin-admins", icon: Shield },
      { label: "Roles & Permissions", key: "admin-roles", icon: Lock },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Vacancy Management", key: "admin-vacancies", icon: Briefcase },
      { label: "Course Management", key: "admin-courses", icon: BookOpen },
      { label: "Study Material", key: "admin-material", icon: FileText },
      { label: "Question Bank", key: "admin-questions", icon: Database },
      { label: "Test Management", key: "admin-tests", icon: ClipboardList },
      { label: "Current Affairs", key: "admin-current-affairs", icon: Newspaper },
      { label: "Blog Management", key: "admin-blogs", icon: FilePlus },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Payment Management", key: "admin-payments", icon: DollarSign },
      { label: "Coupons", key: "admin-coupons", icon: Tag },
      { label: "Referral Management", key: "admin-referrals", icon: Gift },
    ],
  },
  {
    group: "Platform",
    items: [
      { label: "Notification Center", key: "admin-notifications", icon: Bell },
      { label: "Banner Management", key: "admin-banners", icon: Image },
      { label: "Certificate Management", key: "admin-certificates", icon: BadgeCheck },
      { label: "CMS Management", key: "admin-cms", icon: Layers },
      { label: "SEO Management", key: "admin-seo", icon: Search },
      { label: "Website Settings", key: "admin-settings", icon: Globe },
      { label: "Security", key: "admin-security", icon: Lock },
      { label: "Backup & Restore", key: "admin-backup", icon: Database },
    ],
  },
];
