export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  min_team_size: number;
  max_team_size: number;
  category: string;
  active: boolean;
}

/**
 * All problem statements are designed to solve real needs of the
 * Department of Artificial Intelligence & Machine Learning,
 * Jeppiaar Engineering College (faculty, students, labs, exam cell).
 */
export const PROBLEMS: ProblemStatement[] = [
  {
    id: "1",
    title: "Department Attendance Tracker",
    description:
      "Build a simple web app for AI & ML faculty to mark daily class attendance by section, view subject-wise % for each student, export reports for the exam cell, and flag students below 75% so mentors can intervene early.",
    difficulty: "easy",
    min_team_size: 1,
    max_team_size: 3,
    category: "Department Operations",
    active: true,
  },
  {
    id: "2",
    title: "AI/ML Lab Slot Booker",
    description:
      "Create a booking system for the department AI/ML lab: students and faculty reserve time slots, see which machines/GPUs are free, prevent double-booking, and let the lab-in-charge approve or cancel bookings.",
    difficulty: "easy",
    min_team_size: 1,
    max_team_size: 3,
    category: "Resource Management",
    active: true,
  },
  {
    id: "3",
    title: "IAT / Assignment Dropbox",
    description:
      "Develop a portal where AI & ML students upload internal assessment (IAT) / assignment files by subject and deadline. Faculty can download submissions, mark as reviewed, and see who is late — useful for exam cell and course coordinators.",
    difficulty: "easy",
    min_team_size: 2,
    max_team_size: 4,
    category: "Academic Workflow",
    active: true,
  },
  {
    id: "4",
    title: "Department Notice & Event Board",
    description:
      "Build a digital notice board for the AI & ML department: post circulars, seminar dates, placement drives, and internal deadlines. Filter by year/section, pin important items, and let students mark notices as read.",
    difficulty: "medium",
    min_team_size: 3,
    max_team_size: 5,
    category: "Communication",
    active: true,
  },
  {
    id: "5",
    title: "Mentor–Mentee Allocator",
    description:
      "Create a tool that matches AI & ML students with faculty mentors based on research interest (CV, NLP, MLOps, etc.), year, and mentor load. Faculty see their mentee list; students see mentor contact and meeting slots.",
    difficulty: "medium",
    min_team_size: 3,
    max_team_size: 5,
    category: "Academic Workflow",
    active: true,
  },
  {
    id: "6",
    title: "Student Project Showcase",
    description:
      "Design a department portfolio site where AI & ML students publish mini-projects and final-year projects (title, abstract, tech stack, demo link, GitHub). Faculty and visitors can filter by domain and year — useful for NAAC, visitors, and placements.",
    difficulty: "medium",
    min_team_size: 4,
    max_team_size: 6,
    category: "Showcase & Portfolio",
    active: true,
  },
  {
    id: "7",
    title: "Department Research Repository",
    description:
      "Build a searchable archive of papers, posters, and project reports from the AI & ML department. Tag by topic and year, store PDF/links, and let faculty add publications so the department has one place for research output.",
    difficulty: "medium",
    min_team_size: 4,
    max_team_size: 6,
    category: "Knowledge Management",
    active: true,
  },
  {
    id: "8",
    title: "Conflict-Free Timetable Helper",
    description:
      "Develop a timetable assistant for the AI & ML department that takes subjects, faculty, rooms, and lab slots as input and suggests a weekly schedule with minimal clashes (faculty double-booked, room conflict, back-to-back labs).",
    difficulty: "hard",
    min_team_size: 5,
    max_team_size: 8,
    category: "Scheduling",
    active: true,
  },
  {
    id: "9",
    title: "Internal Exam Support Toolkit",
    description:
      "Create tools that help the department and exam cell for IATs: seating plan generator by reg. no., absentees list, quick mark-entry helper, or a simple browser-based proctoring checklist for online internals.",
    difficulty: "hard",
    min_team_size: 6,
    max_team_size: 9,
    category: "Examinations",
    active: true,
  },
  {
    id: "10",
    title: "AI & ML Department FAQ Chatbot",
    description:
      "Build a chatbot trained on department FAQs: syllabus, lab rules, faculty cabin hours, internal marks process, placement eligibility, and event dates. Students get instant answers; reduces repetitive questions to staff and coordinators.",
    difficulty: "hard",
    min_team_size: 6,
    max_team_size: 9,
    category: "Support Automation",
    active: true,
  },
  {
    id: "11",
    title: "Faculty–Student Research Connector",
    description:
      "Design a platform for the AI & ML department where faculty list open research/project slots and students express interest. Track ongoing work, preferred domains (vision, LLMs, edge AI), and help form project groups for mini and major projects.",
    difficulty: "extreme",
    min_team_size: 8,
    max_team_size: 12,
    category: "Collaboration",
    active: true,
  },
  {
    id: "12",
    title: "Lab & Resource Demand Predictor",
    description:
      "Create a simple analytics tool that uses past enrollment, elective choices, and lab booking history to forecast how many GPU hours, seats, and lab sessions the AI & ML department will need next semester — for planning purchases and schedules.",
    difficulty: "extreme",
    min_team_size: 9,
    max_team_size: 15,
    category: "Planning & Analytics",
    active: true,
  },
];

export function pickDifficulty(teamSize: number): Difficulty {
  if (teamSize <= 3) return "easy";
  if (teamSize <= 6) return "medium";
  if (teamSize <= 9) return "hard";
  return "extreme";
}

export function getProblemForTeam(teamSize: number): ProblemStatement {
  const difficulty = pickDifficulty(teamSize);

  const matches = PROBLEMS.filter(
    (p) =>
      p.active &&
      p.difficulty === difficulty &&
      p.min_team_size <= teamSize &&
      p.max_team_size >= teamSize
  );

  if (matches.length > 0) {
    return matches[Math.floor(Math.random() * matches.length)]!;
  }

  const fallback = PROBLEMS.filter(
    (p) =>
      p.active && p.min_team_size <= teamSize && p.max_team_size >= teamSize
  );

  if (fallback.length === 0) {
    throw new Error("No problem statement found for this team size.");
  }

  return fallback[Math.floor(Math.random() * fallback.length)]!;
}
