---
name: journal
description: >-
  Maintain GenPPT daily dev journal (journal/2026/YYYY-MM-DD.md) with founder/operator insights, architecture epiphanies, full UUID references, and code paths; reconcile prior opens into todo.md/feedback.md; and reply in STE100 + ADHD-friendly action style. Use for /journal, log it, or /gm prep. Month rollup only when the operator explicitly asks (end of month).
disable-model-invocation: true
---

# GenPPT journal

Operator-facing build log, product insights, and agent context surface.

## Core Rule: Target Audience Split

- **The Journal `.md` file is for the AGENT** (future sessions / context retrieval). Capture both **operator/founder insights** (architectural revelations, product epiphanies, simplification opportunities) and technical context (full deck UUIDs `dfd0e0e1-4bcf-4e23-82db-d1b71d6028d3`, exact file paths `**Files:**`, test commands `**Tests:**`, root causes, metrics). Do not make it purely a mechanical bug log—preserve the why, learnings, and insights.
- **The Chat Reply is for the HUMAN** (ADHD-friendly STE100). Lead with action, no preamble, no closing pleasantries, no file dump unless requested, max 5 items per section, and end with one concrete next step.

## File path

```
journal/2026/{YYYY-MM-DD}.md
```

Use **today's calendar date** in the operator's timezone. Never write live entries to `journal/2026/{YYYY-MM}.md`.

If the day file is missing, create it with:

```markdown
# GenPPT Journal — YYYY-MM-DD
```

Same calendar day → **append** to that day's file (or update the last entry if it is the same session). Do not invent a new date file. Do not dump the day into the month file.

## Entry template (`.md` file — for the AGENT)

Append or consolidate entries at the **end of today's file**, separated by `---`.

```markdown
---

## {Title} (~HH:MM)

{Outcome, operator/founder insights, architectural epiphanies, root cause, fix, and cost/latency metrics}

**Insight:** {Product/founder realization, simplification win, or strategic takeaway from the session} ← omit if routine fix

**Files:** `{paths or short module names}`

**Tests:** {count, test file name, or command}

**Open:** {one follow-up} ← omit if fully finished
```

### Reference standards (`.md` file)

- **Capture founder & architecture insights**: If the operator has an epiphany or realizes an architectural simplification during the session (e.g. noticing a framework feature obsoletes custom tooling), document it explicitly.
- **ALWAYS use full deck UUIDs** (e.g. `dfd0e0e1-4bcf-4e23-82db-d1b71d6028d3`, not truncated `dfd0e0e1…`) so future agents can query database rows or search `.tmp/decks/`.
- **Include file paths** (`**Files:**`) and test references (`**Tests:**`) so changes can be traced across commits.
- **Customer entries**: `email · deck \`full-uuid\`` then action + outcome.

## Workflow — journal + reconcile

Every `/journal` run writes to **today's day file** and reconciles `todo.md`.

### 1. Write/Update Journal (`.md` file)

```
Is the operator asking to close the month / roll up / summarize the month?
├── Yes → month rollup (section 4). Do not also append a day entry unless they also asked to journal today.
└── No  → day entry
          ├── Path = journal/2026/{today YYYY-MM-DD}.md
          ├── Create with H1 if missing
          ├── Read the day file tail (not the month file)
          ├── Scan for operator insights, architecture epiphanies, simplification, product takeaways
          ├── Pick ~HH:MM
          └── Append or update the last same-session entry
```

Add **`**Open:**`** only for new unfinished work from this session.

### 2. Reconcile opens (`todo.md` / `feedback.md`)

Before completing, reconcile prior opens:

| Prior open status | Action |
| --- | --- |
| **Fixed this session** | Remove matching bullet from `todo.md`. Update `feedback.md` when applicable. |
| **Still blocked** | Keep **one** bullet in `todo.md`. |
| **Superseded** | Update `todo.md` bullet. |
| **New gap found** | Add **`**Open:**`** to the journal entry **and** one new todo bullet. |

**Open hygiene rules:**
- Do not duplicate open items across entries in the same **day**.
- If fixed today, remove the open item from `todo.md`.
- Cap lists at 5 items max in `todo.md`.

Read these index files for reconcile:
- `journal/todo.md` (active work)
- `journal/feedback.md` (user pain status)
- `journal/changelog.md` (plan-level shifts)
- `journal/goals.md` (strategy)

### 3. Chat Reply (`.md` output — for the HUMAN)

Reply using STE100 + ADHD action style:

- **No preamble** — forbidden: "Here is the summary...", "I updated the journal...", "Sure!"
- **No closing pleasantries** — forbidden: "Let me know if...", "Hope this helps!", "Feel free to..."
- **No file/test dump** unless explicitly asked by the operator.
- **Cap items at 5 max** per section.
- **End with ONE concrete next action**.

```markdown
**Closed:** {phrase or "none"}
**Open:** {short list, max 5}
**Next:** {ONE bounded action in <2 minutes}
```

### 4. Month rollup — operator must ask

Run this **only** when the operator says to close the month, roll up, summarize the month, or reconcile into the month file. End of month is not enough by itself.

Why: the live log is daily. The month file is a compressed archive. Writing days into the month file makes retrieval worse and duplicates dates.

1. Confirm the month: `journal/2026/{YYYY-MM}.md`.
2. Read every `journal/2026/{YYYY-MM}-DD.md` for that month (skip `plans/` and non-day files).
3. Write **one** month file: H1 `# GenPPT Journal — YYYY-MM`, then a short recap of themes, then distilled insights — not a paste of every `~HH:MM` heading.
4. Delete the day files for that month after the month file exists and the recap is complete.
5. Do not keep appending to those day files after delete.

Do **not** month-rollup on a normal `/journal`.

## Anti-patterns

- Writing the live entry to `journal/2026/YYYY-MM.md` instead of `YYYY-MM-DD.md`
- Month rollup without an explicit operator ask
- Leaving day files after a requested month rollup
- **Overly dry, purely mechanical logs**: Writing pure stack trace/git diff dumps while ignoring operator insights, architecture epiphanies, and product takeaways from the conversation.
- Truncating deck UUIDs into unusable prefixes in the `.md` file
- Preamble or closing pleasantries in chat replies
- Leaving stale todo bullets after work is marked fixed
- Duplicating the same open item across multiple entries in one day
- Writing release notes to root `CHANGELOG.md` (use `journal/changelog.md`)
