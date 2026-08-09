# AI Problem Solve-a-Thon

**Department of Artificial Intelligence & Machine Learning**  
Jeppiaar Engineering College

Event platform for a 2-hour department hackathon: assign problems by team size, register teams, collect live demos.

**Live site:** [ai-thon-one.vercel.app](https://ai-thon-one.vercel.app)

---

## Winner

| | |
|--|--|
| **Winner** | **Lab Booker Pro** |
| **Problem** | AI/ML Lab Slot Booker (Easy · Resource Management) |
| **Live demo** | [lab-booker-pro.vercel.app](https://lab-booker-pro.vercel.app) |

### Why this won

Judged on **clarity · usefulness for the department · demo quality**.

- **Clarity** — Dashboard, booking flow, and machine inventory are easy to understand in a 2–3 minute presentation.
- **Usefulness** — Directly solves fair GPU/lab access for the AI & ML department (no double-booking, approval states, fleet load).
- **Demo quality** — Multi-page working product: home stats, book a slot, machine inventory, pending/approved/rejected activity — strongest interactive demo among submissions.

---

## All evaluated submissions

| Rank | Solution | Problem match | Live URL |
|------|----------|---------------|----------|
| **1 — Winner** | **Lab Booker Pro** | AI/ML Lab Slot Booker | [lab-booker-pro.vercel.app](https://lab-booker-pro.vercel.app) |
| 2 | CourseFlow Hub (IAT & Assignment Dropbox) | IAT / Assignment Dropbox | [courseflow-hub.vercel.app](https://courseflow-hub.vercel.app) |
| 3 | ExamNexus | Internal Exam Support Toolkit | [exam-nexus-iota.vercel.app](https://exam-nexus-iota.vercel.app) |

### Notes on runners-up

- **CourseFlow Hub** — Strong landing page aligned with the IAT/assignment dropbox problem (upload by subject, faculty review, late list). Dashboard was limited/auth-gated at review time.
- **ExamNexus** — Matches the internal exam support toolkit problem; live page content was not fully evaluable at review time (client-heavy or incomplete shell).

---

## Event

| | |
|--|--|
| **Date** | Friday, 07 August 2026 |
| **Time** | 10:00 AM – 12:10 PM |
| **Venue** | Elite Seminar Hall |
| **Organiser** | Dept. of AI & ML |

| Time | What |
|------|------|
| 10:00 | Check-in |
| 10:30 | Get problem + register |
| 10:45 | Build |
| 11:40 | Present (2–3 min) |
| 12:00 | Winners |

---

## For teams (students)

### 1. Get your problem
Open the [live site → Problems](https://ai-thon-one.vercel.app/problems)

1. Enter **team name**, **size**, **contact email**
2. Click **Get free problem** (or claim a card)
3. Click **Register & mark Taken** so organizers can see you

### 2. Build
Ship a working demo (any stack). Prefer a public URL (Vercel recommended).

### 3. Submit live link
Use the [Submit](https://ai-thon-one.vercel.app/submit) page with team details + public URL.

Optional: also open a PR under `solutions/` (see [solutions/README.md](./solutions/README.md)).

---

## For organizers

1. Activate FormSubmit once (link in organizer inbox)
2. Watch **email** when teams register / submit
3. Review live demos from the Submit / Entries flow
4. Use the site **Organizer** page for links and run-of-show

---

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · React Router  
Deployed on Vercel (SPA). Registration & submissions: FormSubmit email.

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
```

---

**Built by** [Sairam BN](https://bnsairam.vercel.app) · Dept. of AI & ML · Jeppiaar Engineering College
