# AI Problem Solve-a-Thon

**Department of Artificial Intelligence & Machine Learning**  
Jeppiaar Engineering College

Event platform for a 2-hour department hackathon: assign problems by team size, register teams, collect solutions on GitHub.

**Live site:** [ai-thon-one.vercel.app](https://ai-thon-one.vercel.app)

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
2. Click **Get Problem Statement**
3. Click **Register (WhatsApp + Email)** so organizers can see you

### 2. Build
Ship a working demo (any stack). Prefer a public URL (Vercel, Netlify, etc.).

### 3. Submit code to this repo

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/<YOUR_USERNAME>/AI-Competition.git
cd AI-Competition
git checkout -b solution/<your-team-name>

mkdir -p solutions/<Your-Team-Name>
# put your code + a short README inside that folder

git add solutions/<Your-Team-Name>
git commit -m "solution: <Your-Team-Name>"
git push -u origin solution/<your-team-name>
```

Open a **Pull Request** titled:

```text
[Solution] <Your-Team-Name> — <Problem title>
```

Folder layout:

```text
solutions/
  Your-Team-Name/
    README.md      # what you built, how to run, live URL
    ...your code
```

See [solutions/README.md](./solutions/README.md) and [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## For organizers

1. Activate FormSubmit once (link in `sairam@jeppiaarcollege.org` inbox)
2. Watch **WhatsApp** + **email** when teams register
3. Review PRs under `solutions/`
4. Use the site **Organizer** page for links and run-of-show

Optional: set your WhatsApp number in `src/pages/ProblemsPage.tsx`:

```ts
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
```

---

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · React Router  
Deployed on Vercel (SPA). Registration: WhatsApp + FormSubmit email.

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
