#!/usr/bin/env node
/**
 * Prints the exact git commands for submitting a solution to
 * github.com/sairambn/AI-Competition under solutions/
 *
 * Usage:
 *   node cli/submit.mjs --team "Code Warriors" --problem "Attendance Tracker"
 */

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      out[key] = val;
    }
  }
  return out;
}

const args = parseArgs(process.argv);
const team = (args.team || "Your-Team-Name").trim();
const problem = (args.problem || "Problem Title").trim();
const folder = team.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 40);
const branch = `solution/${folder.toLowerCase()}`;

console.log(`
# AI-Thon — GitHub submission commands
# Repo: https://github.com/sairambn/AI-Competition

# 1. Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/AI-Competition.git
cd AI-Competition

# 2. Branch
git checkout -b ${branch}

# 3. Folder + README
mkdir -p solutions/${folder}
# → put your code inside solutions/${folder}/
# → create solutions/${folder}/README.md (see solutions/README.md template)

# 4. Commit & push
git add solutions/${folder}
git commit -m "solution: ${team} — ${problem}"
git push -u origin ${branch}

# 5. Open Pull Request
# Title: [Solution] ${team} — ${problem}
# Base:  sairambn/AI-Competition
`);
