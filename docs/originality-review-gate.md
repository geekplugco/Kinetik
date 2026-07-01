# KINETIK — Originality Review Gate

> The **runnable procedure** that enforces the [Originality Manifesto](./originality-manifesto.md) on every new premium section.
> The manifesto is the *law* (principles P1–P12, the Anti-Copy Checklist, the clone test).
> This is the *gate*: when the review runs, who runs it, what it checks, and what it blocks.

**Status:** canonical · **Enforces:** `docs/originality-manifesto.md` · **bd:** `Kinetik-m13e`
**Applies to:** every new premium section/block, and any redesign of an existing one.

---

## The rule in one line

**No premium section is implemented or closed without passing two gates: a pre-build gate (cheap, before code) and a pre-close gate (verified, before QA sign-off).** A section that cannot prove it is *uniquely Kinetik* or *a primitive executed with Kinetik restraint* is redesigned or removed — never shipped as-is.

---

## Scope: what counts as a "premium section"

| Type | Gate required? | Why |
|------|----------------|-----|
| New marketing/storytelling/commerce section (hero, lab, loadout, lookbook, trust, editorial) | **Yes — full gate** | This is where derivative design hides. |
| New theme block inside a section | **Yes — full gate** | Same risk surface as a section. |
| Redesign of an existing section's layout/interaction | **Yes — full gate** | A redesign can re-introduce a clone. |
| Best-practice **primitive** (plain rich-text, spacer, raw HTML block) | **Lite gate** | Allowed, but must prove Kinetik restraint (Gate A §"Primitive path"). |
| Bug fix, copy tweak, setting addition, schema-only change | No | No new design surface. |

If unsure whether something is "premium," it is — run the full gate.

---

## Gate A — Pre-build (before any Liquid is written)

Cheap, fast, done in the planning/scoping step. Purpose: kill derivative ideas before they cost implementation time.

1. **Write the Originality Note (draft).** Fill the template from manifesto §4:
   ```
   ORIGINALITY NOTE
     Inspiration:   <sources studied, if any — themes, demos, references>
     Transformed:   <benchmark insight re-expressed, via which principles P#>
     Unique:        <what is specifically Kinetik here that exists nowhere else>
     Avoided:       <generic patterns deliberately rejected — cite Anti-Copy items>
     Clone test:    <PASS/FAIL + the one-line reason>
   ```
2. **Run the benchmark-transform** for every borrowed insight (manifesto §3 — `SAW / PRINCIPLE / KINETIK / DROPPED`). No insight enters un-transformed.
3. **Decide the path:**
   - **Premium path** — "Unique" names something real → proceed to build.
   - **Primitive path** — "Unique" is empty → the section is a primitive. Allowed **only** if it commits to Kinetik restraint: mono labels, hairline frame, square corners, single Volt accent, no decoration. Note it as a primitive and proceed.
   - **Reject path** — generic *and* claiming to be premium → redesign the concept or drop the task. Do **not** start coding.

**Gate A verdict:** `PROCEED (premium)` · `PROCEED (primitive)` · `REDESIGN` · `DROP`.
Record the verdict + Originality Note in the task / handoff before implementation begins.

---

## Gate B — Pre-close (after build, before QA sign-off)

Verified against the real, rendered section. Purpose: catch the clone that crept in during implementation.

Run the full **Anti-Copy Checklist** (manifesto §2) against the built section and answer:

- **Visual tells** — clear? (one accent, hairline elevation, square corners, no wash, `KINETIK.` lockup respected)
- **Typographic tells** — clear? (size-driven hierarchy, mono spec voice on labels/prices, no filler/emoji, no serif/script)
- **Interaction tells** — clear? (transform+opacity only, no scroll-hijack/parallax theater, instant variant swap, reduced-motion path)
- **Substance tells** — clear? (no hardcoded fake claims; merchant-editable; Kinetik-lexicon naming)
- **The clone test** — **with the logo removed, is this identifiable as Kinetik by grid, type, voice, and Volt discipline alone?**

Finalize the Originality Note (Gate A draft → verified) and attach it to the PR/close.

**Gate B verdict:**
- **PASS** — clone test passes, no un-justified Anti-Copy item checked → may close.
- **FIX** — one or more Anti-Copy items checked without a recorded transform → fix and re-run Gate B.
- **REJECT** — reads as a direct clone of another theme/demo, however polished → redesign or remove. Cannot close.

---

## Where the gate plugs into the workflow

```
scope/plan ─► [GATE A] ─► implement ─► [GATE B] ─► QA ─► close
                │                          │
          REDESIGN/DROP               FIX/REJECT
          (stop, rework)              (cannot close)
```

- **Gate A** runs during `/tplan` (or `/tscope`) for the section. Its verdict + draft note land in the task handoff.
- **Gate B** runs during `/tqa` / `/trai`, before `/tclose`. A FIX or REJECT verdict **blocks `bd close`** for that section's task.
- The completed Originality Note is part of the close reason / PR description — this is the auditable artifact.

---

## Enforcement & escalation

- **A section may not be closed with a FIX or REJECT Gate B verdict.** The bd task stays open until PASS.
- **Generic-but-honest is not enough for a premium section.** "It works and it's clean" describes a primitive; a premium section must fill "Unique."
- **"We did it like `<Theme>`" is never a justification** — only "transformed `<Theme>`'s insight into Kinetik via P#."
- The **Originality category of the 10/10 scorecard** (`Kinetik-4ef`) cannot reach 10 while any shipped section carries an unresolved FIX/REJECT or fails the clone test.
- If two reviewers disagree on the clone test, the section is treated as failing until it can be re-argued to PASS — the gate defaults to *reject*, not *waive*.

---

## Quick reference — the gate checklist

```
[ ] Gate A done: Originality Note drafted, benchmark-transforms recorded, path chosen
[ ] Gate A verdict recorded in handoff (PROCEED premium | PROCEED primitive | REDESIGN | DROP)
[ ] Gate B done: Anti-Copy Checklist run against the rendered section
[ ] Clone test: identifiable as Kinetik with the logo removed — PASS
[ ] Originality Note finalized and attached to PR/close
[ ] Gate B verdict = PASS (no un-justified Anti-Copy item)
```
