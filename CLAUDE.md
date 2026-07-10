# Kinetik

A Shopify theme project, currently in the design-system / prototype stage.

## Stack
- Shopify theme (Liquid) — target output, not yet scaffolded
- Design prototype: HTML/CSS + React (JSX) under `design/`
- No package manager or build tooling configured yet

## Layout
- `design/Kinetik Design System/` — design tokens (`tokens/*.css`), component guidelines, UI kits, templates
- `design/homepage/` — homepage prototype (`index.html`, `app.jsx`), screenshots, image uploads

## Development
- No `dev`/`build`/`test`/`lint` scripts yet — add when build tooling is introduced

## Branching
- Main: main
- Features: feat/<id>-description

## Linear
- Prefix: <unset>

---

@~/.claude/rules/agent-tools.md
@~/.claude/rules/bd-startup.md
@~/.claude/rules/workflow.md

## Teifi Skills

Skills installed at `~/.claude/skills/`. Invoke with `/t<short>` slash command.

## Beads / Dolt Startup

**Every session start:**
```bash
bd dolt status || bd dolt start
bd prime
```

**New project — pin port once (prevents /tmp file accumulation):**
```bash
~/.claude/scripts/bd-pin-port.sh   # auto-picks free port in 54400–54499
```

## Workflow

Every code change:
```
/twf → /tclarify → /tplan → /tdo → /tqa → /tship
```

## Commands

| Command | Use when |
|---------|----------|
| `/twf` | Session start — restore beads, show open tasks |
| `/tclarify` | Requirements unclear — interview before coding |
| `/tplan` | Lock in architecture before coding |
| `/tsc` | Linear ticket deep-dive (Figma, Notion, related) |
| `/tdo <id>` | Implement ticket end-to-end |
| `/ttdd` | TDD — write failing test first |
| `/tqa` | Browser QA after any UI change |
| `/tcr` | Pre-PR code review |
| `/trev` | Address open PR review comments |
| `/tship` | Merge main → push → PR |
| `/tfetch <url>` | Fetch URL — cookies + 97% token compression |
| `/tnote <text>` | Persistent note — survives compaction |
| `/tlearn` | Save session learnings to Nexus |
| `/tinit` | Patch CLAUDE.md for current project |
| `/trouter pick "<task>"` | Pick free OpenRouter model for agent spawn |

## Beads

```bash
bd ready                       # available tasks
bd update <id> --claim         # claim before starting
bd close <id> --reason "done"  # complete
bd prime                       # restore context after compaction
```

## Pre-task ritual

```bash
# 1. Search Nexus docs (web docs, indexed articles)
/tctx search "<keywords>"

# 2. Search codebase symbols (functions, classes)
mcp__jcodemunch-mcp__index_folder(path: "<src-dir>")        # once per session per new codebase
mcp__jcodemunch-mcp__search_symbols(repo, "<symbol>")      # find by name
mcp__jcodemunch-mcp__get_symbol(repo, "<id>")            # read one symbol

# 3. Full-text search across files
# → use jcodemunch MCP: search_symbols / search_text / get_symbol
```

**Rule:** Never `grep`/`find`/`cat` a whole file to find a function.
Use `teifi-munch search` or `mcp__jcodemunch-mcp__search_symbols` first.

## Agent routing (free models)

When spawning sub-agents, use `Agent()` tool in-session (preferred — no claude -p quota):
```
Agent(prompt="<task>", subagent_type="general-purpose")
```
Legacy `claude -p` is deprecated due to per-session quota. teifi-router still useful for picking free models if you DO opt into claude -p.

## Web fetch

Always use `/tfetch <url>` first:
- Injects Chrome cookies automatically
- 97%+ token reduction vs raw HTML
- Supports auth-gated pages via `--interactive`

**NEVER use built-in `WebFetch` directly.** `/tfetch` handles all URLs — including auth-gated pages.

## Web search

Use `/ttavily <query>` for web searches. Use `/tdocs <url>` to fetch and compress a specific URL.

**NEVER use built-in `WebSearch` directly.** Use `/ttavily` for search queries, `/tdocs` for known URLs.

## Skill Routing

Before proposing any new script/utility: check `@.claude/rules/SCRIPTS_INDEX.md` for an existing equivalent.

See `@.claude/rules/skill-routing.md` for the full decision guide:
- Which search tool for which file type
- tfigma: when to use --format css/tailwind, --tokens, --variants, --depth, --images, --diff-merge
- ttheme: commands reference (search/refs/uses/schema/setting)
- tconnect: read/write commands, Shopify query syntax, tshop+tconnect workflow
- tfetch/ttavily routing rules

## Mandatory Rules

1. **Web fetch** — Never use `WebFetch`. Always use `/tfetch <url>`.
2. **Code search** — Never grep whole files. Use `teifi-munch` or `mcp__jcodemunch-mcp__search_symbols`.
3. **Task tracking** — Every work session must have an active beads task.
4. **No prose comments in code** — explanatory comments drift from the code when requirements change, then mislead; make names carry the meaning instead. Guard: `node web/scripts/guard-comments.mjs theme` must PASS. Banned: `//`, `/* */`, `<!-- -->`, `{% comment %}`. Allowed because the toolchain validates them against the code (can't silently drift): Liquid `{% doc %}` snippet contracts (theme-check `ValidDoc`) and `{%- # theme-check-disable/enable -%}` directives.
5. **No AI-slop in written content** — before finalizing any merchant-facing or user-facing copy (docs, FAQ, support pages, marketing text, commit messages meant for humans), run the `tantislop` skill in rewrite mode to strip banned vocabulary, em-dash overuse, parataxis, rule-of-three patterns, hedging, and structural uniformity. Applies to both English and Vietnamese content.

## Theme Z-Index Rule

Global stacking must go through `theme/snippets/z-layers.liquid`.
Use semantic classes for site-level layers:
`kx-z-header`, `kx-z-sticky`, `kx-z-overlay`, `kx-z-drawer`, `kx-z-modal`, `kx-z-popover`, `kx-z-toast`.

Do not add new hardcoded global Tailwind z-index classes such as `z-40`, `z-50`, `z-[70]`, or `z-[81]` for header, drawer, modal, overlay, sticky bars, cart, search, quickview, filters, or size guide. Local stacking inside a component can still use small relative values like `z-10` or `z-20` when it does not compete with another site-level overlay.


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:6cd5cc61 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->
