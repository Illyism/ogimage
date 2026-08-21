---
name: gm
description: >-
  Loads project journal context from journal/. Use when the user types /gm,
  mentions @journal/, or asks for journal-grounded context before coding or
  deciding.
disable-model-invocation: true
---

# /gm — journal context

## When this applies

The user invoked **`/gm`**, referenced **`@journal/`**, or asked to align with recent decisions and project notes.

## Do this first

1. Read **[journal/AGENTS.md](../../../journal/AGENTS.md)** for layout and conventions.
2. Read **today’s daily note** if it exists: `journal/YYYY/YYYY-MM-DD.md` (use the workspace date the user provides or infer from context).
3. Read **standing files** when relevant to the task:
   - [journal/todo.md](../../../journal/todo.md)
   - [journal/changelog.md](../../../journal/changelog.md)
   - [journal/goals.md](../../../journal/goals.md)
4. If the question ties to a specific day or decision, read that file under `journal/YYYY/YYYY-MM-DD.md`.

## How to use what you read

- Treat **Decisions** and **Next Steps** in daily entries as authoritative unless the user overrides them.
- Prefer **Current State** and **Interpretation** for “where we left off” summaries.
- Do not paste raw personal or customer-identifying details from the journal into unrelated outputs; summarize patterns only (see AGENTS.md).

## Stop when

You have enough journal context to answer or implement without contradicting recorded decisions—unless the user explicitly wants to revise them.
