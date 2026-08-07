import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  GitBranch, Copy, Check, Terminal, FolderGit2, ExternalLink, Users, Lightbulb,
} from "lucide-react";
import { PROBLEMS } from "@/data/problems";

const REPO = "https://github.com/sairambn/AI-Competition";

function slugify(name: string) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40) || "Your-Team";
}

export function SubmitPage() {
  const [searchParams] = useSearchParams();
  const [teamName, setTeamName] = useState(searchParams.get("team") ?? "");
  const [problemId, setProblemId] = useState(searchParams.get("problem") ?? "");
  const [contactEmail, setContactEmail] = useState("");
  const [techStack, setTechStack] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const selected = PROBLEMS.find((p) => p.id === problemId);
  const folder = slugify(teamName || "Your-Team");
  const branch = `solution/${folder.toLowerCase()}`;

  const readmeTemplate = `# ${teamName || "Your Team Name"}

**Problem:** ${selected?.title ?? "[Problem Title]"}  
**Team size:** [X]  
**Contact:** ${contactEmail || "email@example.com"}  
**Tech stack:** ${techStack || "React / Python / ..."}

## What we built
Short description of your solution (2–4 sentences).

## How to run
\`\`\`bash
# install & run commands
\`\`\`

## Demo / Screenshots
- Add images or a short demo link

## Notes for judges
Anything important for evaluation.
`;

  const commands = `# 1. Fork the repo on GitHub (button top-right), then:
git clone https://github.com/YOUR-USERNAME/AI-Competition.git
cd AI-Competition

# 2. Create your branch
git checkout -b ${branch}

# 3. Create your solution folder and README
mkdir -p solutions/${folder}
# (put your code inside solutions/${folder}/ )
cat > solutions/${folder}/README.md << 'EOF'
${readmeTemplate}
EOF

# 4. Commit & push
git add solutions/${folder}
git commit -m "solution: ${teamName || "Team"} — ${selected?.title ?? "Problem"}"
git push -u origin ${branch}

# 5. Open a Pull Request on GitHub
# Title: [Solution] ${teamName || "Team Name"} — ${selected?.title ?? "Problem Title"}
# Base repo: sairambn/AI-Competition
`;

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-up text-center">
        <span className="mb-3 inline-flex rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
          GitHub Submission
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Submit via Pull Request
        </h1>
        <p className="mt-2 text-muted-foreground">
          Push your solution as <strong>one folder</strong> under{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">solutions/</code>{" "}
          in this repository.
        </p>
      </div>

      <div className="mb-8 space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5 text-gold" /> Personalize your commands
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Team Name</label>
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Code Warriors"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="team@college.edu"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <Lightbulb className="h-3.5 w-3.5 text-gold" /> Assigned Problem
          </label>
          <select
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          >
            <option value="">Select problem…</option>
            {PROBLEMS.filter((p) => p.active).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Tech stack (optional)</label>
          <input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, Node, Tailwind…"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Terminal className="h-5 w-5 text-gold" /> Commands to type
          </h2>
          <button
            type="button"
            onClick={() => copy(commands, "cmds")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary"
          >
            {copied === "cmds" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            {copied === "cmds" ? "Copied" : "Copy all"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border bg-[#1e1e1e] p-4 text-[13px] leading-relaxed text-[#d4d4d4]">
          {commands}
        </pre>
      </section>

      <section className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <FolderGit2 className="h-4 w-4 text-gold" /> Your folder
          </h3>
          <pre className="rounded-lg bg-secondary/60 p-3 text-xs text-foreground">
{`solutions/
└── ${folder}/
    ├── README.md
    └── (your code)`}
          </pre>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <GitBranch className="h-4 w-4 text-gold" /> Branch name
            </h3>
            <button
              type="button"
              onClick={() => copy(branch, "branch")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {copied === "branch" ? "Copied" : "Copy"}
            </button>
          </div>
          <code className="block rounded-lg bg-secondary/60 px-3 py-2 text-sm">{branch}</code>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Open GitHub repo <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={`${REPO}/tree/main/solutions`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          View solutions folder
        </a>
      </div>

      <div className="mt-10 rounded-xl border border-gold/30 bg-parchment p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Why this way?</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Everything stays version-controlled under one place.</li>
          <li>Judges review code + README directly in the Pull Request.</li>
          <li>You practice the real software workflow (fork → branch → PR).</li>
          <li>No browser upload size limits.</li>
        </ul>
      </div>
    </div>
  );
}
