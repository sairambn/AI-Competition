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

export const PROBLEMS: ProblemStatement[] = [
  {
    id: "1",
    title: "Attendance Tracker",
    description:
      "Build a web-based attendance tracking system for the department that lets faculty mark attendance, generate daily reports, and alert students with low attendance via email.",
    difficulty: "easy",
    min_team_size: 1,
    max_team_size: 3,
    category: "Department Operations",
    active: true,
  },
  {
    id: "2",
    title: "Lab Booking System",
    description:
      "Create a software solution that allows students and faculty to book AI/ML lab slots, check equipment availability, and avoid double bookings.",
    difficulty: "easy",
    min_team_size: 1,
    max_team_size: 3,
    category: "Resource Management",
    active: true,
  },
  {
    id: "3",
    title: "Assignment Submission Portal",
    description:
      "Develop a portal where students submit assignments, faculty review them, and deadlines are tracked with automatic reminders.",
    difficulty: "easy",
    min_team_size: 2,
    max_team_size: 4,
    category: "Academic Workflow",
    active: true,
  },
  {
    id: "4",
    title: "Internal Notice Board",
    description:
      "Build a digital notice board for the department where announcements, event updates, and deadlines are posted and filtered by category.",
    difficulty: "medium",
    min_team_size: 3,
    max_team_size: 5,
    category: "Communication",
    active: true,
  },
  {
    id: "5",
    title: "Mentor-Mentee Matching",
    description:
      "Create a software tool that matches students with faculty mentors based on interests, research areas, and availability.",
    difficulty: "medium",
    min_team_size: 3,
    max_team_size: 5,
    category: "Academic Workflow",
    active: true,
  },
  {
    id: "6",
    title: "Project Showcase Platform",
    description:
      "Design a platform for students to showcase AI/ML projects, receive peer feedback, and build a department portfolio.",
    difficulty: "medium",
    min_team_size: 4,
    max_team_size: 6,
    category: "Showcase & Portfolio",
    active: true,
  },
  {
    id: "7",
    title: "Research Paper Repository",
    description:
      "Build a searchable repository for department research papers with tagging, citation tracking, and access control.",
    difficulty: "medium",
    min_team_size: 4,
    max_team_size: 6,
    category: "Knowledge Management",
    active: true,
  },
  {
    id: "8",
    title: "Smart Timetable Generator",
    description:
      "Develop an AI-assisted timetable generator that schedules classes, labs, and faculty duties while minimizing conflicts.",
    difficulty: "hard",
    min_team_size: 5,
    max_team_size: 8,
    category: "Scheduling",
    active: true,
  },
  {
    id: "9",
    title: "AI Proctoring System",
    description:
      "Create a software prototype for remote proctoring of internal exams using computer vision or behaviour analysis.",
    difficulty: "hard",
    min_team_size: 6,
    max_team_size: 9,
    category: "Examinations",
    active: true,
  },
  {
    id: "10",
    title: "Department Helpdesk Chatbot",
    description:
      "Build a chatbot that answers common student queries about courses, faculty availability, events, and lab rules.",
    difficulty: "hard",
    min_team_size: 6,
    max_team_size: 9,
    category: "Support Automation",
    active: true,
  },
  {
    id: "11",
    title: "Research Collaboration Network",
    description:
      "Design a platform that connects faculty and students across research groups, tracks ongoing projects, and recommends collaborators.",
    difficulty: "extreme",
    min_team_size: 8,
    max_team_size: 12,
    category: "Collaboration",
    active: true,
  },
  {
    id: "12",
    title: "Predictive Resource Planner",
    description:
      "Create a predictive system that forecasts lab equipment, classroom, and faculty needs for upcoming semesters based on enrollment data.",
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
