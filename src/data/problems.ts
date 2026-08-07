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
 * Every problem must be buildable in the event window AND leave something
 * the Department of AI & ML can actually use (faculty, students, lab, exam cell).
 */
export const PROBLEMS: ProblemStatement[] = [
  {
    id: "1",
    title: "Department Attendance Tracker",
    description:
      "Faculty of AI & ML still track attendance in registers or scattered sheets. Build a web app to mark attendance by class/section, show subject-wise %, export a clean report for the exam cell, and highlight students below 75%. Outcome: one place for attendance that faculty and mentors can trust.",
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
      "Students and faculty fight for lab machines and GPU time. Build a booking page for the department AI/ML lab: pick slot, see free machines, no double-booking, lab-in-charge can approve/cancel. Outcome: fair lab access and less coordination on WhatsApp.",
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
      "Internal assessments and assignments often arrive by email or drive links. Build a portal where students upload by subject and deadline; faculty download, mark reviewed, and see late list. Outcome: orderly submissions for course coordinators and exam cell.",
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
      "Circulars, seminars, and placement updates get lost in groups. Build a notice board for the AI & ML department: post by category, filter by year/section, pin important items. Outcome: students see the right notices; staff post once instead of repeating.",
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
      "Mentor allocation is often manual and uneven. Build a tool that matches AI & ML students to faculty by interest (CV, NLP, MLOps, etc.), year, and mentor load. Outcome: clear mentee lists for faculty and a known mentor for every student.",
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
      "Good student projects stay on laptops. Build a department showcase: title, abstract, tech stack, demo link, GitHub; filter by domain and year. Outcome: ready material for NAAC, visitors, placements, and junior students looking for ideas.",
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
      "Papers and project reports are scattered. Build a searchable archive for the AI & ML department: tag by topic/year, store PDF or link, faculty can add publications. Outcome: one official place for department research output.",
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
      "Timetable clashes (faculty double-booked, room conflict, stacked labs) waste hours every semester. Build a helper that takes subjects, faculty, rooms, and lab slots and suggests a weekly grid with fewer conflicts. Outcome: a draft timetable the department can refine, not start from zero.",
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
      "IAT logistics (seating, absentees, mark lists) are repetitive. Build practical tools for the department/exam cell: seating by reg. no., absentees sheet, or a simple mark-entry helper. Outcome: less manual work during internal exams and cleaner records.",
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
      "Staff and coordinators answer the same questions every week. Build a chatbot with department FAQs: syllabus, lab rules, faculty hours, internal marks process, placement eligibility, events. Outcome: students get answers anytime; office load drops.",
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
      "Students struggle to find faculty project slots; faculty struggle to find interested students. Build a board where faculty list open mini/major project topics and students apply by domain (vision, LLMs, edge AI). Outcome: faster project group formation inside the department.",
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
      "Lab capacity and GPU needs are guessed each semester. Build a simple planner that uses enrollment, electives, and past lab use to estimate seats, sessions, and GPU hours needed next term. Outcome: data the department can use for scheduling and purchase requests.",
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
