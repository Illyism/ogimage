# Journal entry examples

## UI fix (typical)

```markdown
---

## Concept gen loading UI (~19:03)

Four spinners and five duplicate labels during first concept batch. One spinner, phase-aware slot copy, hide gallery dupes.
```

## Bug + fix

```markdown
---

## Concept vibe-check spinner stuck (~18:39)

Sidebar "Reviewing concepts…" never cleared when chat diverged. Added timeout + fallback; hide while generating; invalidate deck on tool patches.
```

## Incident (open only when still blocked)

```markdown
---

## Global deck rewrite routing — dfd0e0e1 (~15:30)

User asked for all 25 slides English/LTR. Agent used revise_slides in batches — revision ledger drift, Sentry on activate-revision. Fix: route global ready-mode flips to create_deck; eval global-rewrite-new-deck pass (31s, 0 revise).

**Open:** sequential DB writes for local batch revise — defense-in-depth only.
```

## Incident (closed — no Open line)

```markdown
---

## Approval visual feedback latency (~15:12)

Redundant inspect after concept sheet auto-inject (18.5s). Omitted inspect from active tools when sheet injected. Re-benchmark 9.1s, 0 tools.
```

## Customer recovery

```markdown
---

## Solar-shadow customer recovery (~18:40)

user@example.com · deck `5c0e58da-…` — meta concepts, not stuck. Regen on localhost → on-topic A/B; scrubbed chat. Emailed _Your concepts are ready_.
```

## Shipped / infra

```markdown
---

## Workflow run status over stall timer (~18:30)

Concept UI no longer invents "stopped" from silence when a Workflow run exists. Reconcile via getRun(runId).status; skip stall when workflowRunId is set.
```

## `/journal` reply (after reconcile)

```markdown
**Closed:** approval inspect latency (sub-5s tuning dropped — 9s is shippable).

**Still open:** deck-chat --paid green run; 478157d4 defer replay.

**New:** sequential revise DB hardening (defense-in-depth).

**Next:** merge instruction + eval changes, then run --paid smoke.
```

Only when the operator asks or the deliverable is a new harness:

```markdown
---

## Deck-chat eval harness (~18:32)

Production-faithful workflow eval via POST /turn + handoff invariants. 14 routing cases; paid tier optional.

**Tests:** handoff-invariants + deck-chat eval.ts
```
