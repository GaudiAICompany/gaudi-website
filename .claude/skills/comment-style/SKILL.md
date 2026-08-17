---
name: comment-style
description: The project standard for code comments and docstrings — a comment explains the WHY, not the WHAT. Use when writing or reviewing any comment or docstring, or when auditing a file or diff for comment noise.
---

# Comment Style

A comment or docstring earns its place only by saying something the code cannot. The code and the
names already state *what* happens; a comment exists for the *why* — the reasoning and the decisions
behind the code.

A good comment lets someone debugging six months from now decide, immediately:

1. what this is and why it is needed,
2. whether the bug they are chasing lives here or not,
3. without a step-by-step retelling of the code (they can read the code for that).

Guiding heuristic: when a unit's comments outweigh its code, that is a smell. The name already
carries the *what*; the comment is only for what the code cannot express.

Apply this literally to **docstrings**: a docstring longer than the function body it documents is
almost always over-explaining. Measure it — count the docstring lines against the code lines. When
the docstring wins, cut it back to the one non-derivable *why* (or the debugger cue) and let the
code speak. This is the most common miss; check it on every function, not just the noisy ones.

## The two-pass filter

Apply to every comment and docstring, in order:

1. **Does it need to exist?** If the code plus the name already say it, **delete it** — do not
   reword it.
2. **If it survives** (there is a non-derivable *why*), **distill it** to the debugger's lens:
   what + why + "if you see X wrong, it was decided here", with no narration, and never longer than
   the code it documents.

Prune first, then trim what remains. A large docstring sometimes ends at three lines, and sometimes
at zero.

### Delete (do not reword)

- **Narration of the what** — a restatement of what the code already does.
- **Change-log or model reasoning** — text that only makes sense next to the diff that introduced
  it; read cold, months later, it is noise.
- **Forward references to code that is not present** — a comment defending a decision by pointing at
  code that lives in another change or module.
- **Restating the name** of the function or constant.
- **Re-explaining a named helper at the call site** — the rationale for what a well-named helper does
  (why `fold_confusables` folds, why `coerce_name_text` isn't `str()`) belongs in that helper's own
  docstring, not repeated at every place it is called. If you find yourself justifying a helper's
  behaviour at the call site, the comment goes on the helper.
- **Consumer-usage reasoning at a definition site** — a constant's or function's comment that explains
  how or why its *consumers* use it ("all null → contentless, inflates the count"; "ranked above soft,
  applied later by X"). That reasoning belongs at the consumer, where it usually already lives. A
  constant's comment should state what the value IS, decode a cryptic value, or flag a hard constraint
  (e.g. "MUST match X's phrasing") — nothing about downstream use. When the name and value already say
  what it is, delete the comment. **A constant comment is ONE line.** If it is growing to two or more,
  it is smuggling in consumer/ordering rationale that belongs at the consumer — move it there (or delete
  it if the consumer already says it). A four-line block above a constant is the loudest instance of this
  smell, not an exception to it.
- **A body comment repeating the function's own docstring** — the typical leftover when a docstring
  was distilled from an existing comment and the original stayed behind. One of the two goes
  (usually the body comment; fold anything only it says into the docstring).
- **A comment restating an adjacent emitted string** — a warning/question/log/exception message
  built right below already documents the rule, in full sentences, and it is user-facing so it
  cannot drift from the behaviour. A comment above it paraphrasing the message is narration.

### Keep (distilled, never longer than the code)

- **The non-derivable why** — the decision behind the code.
- **Ordering constraints in a pipeline** — "runs before X because…"; reordering breaks silently, so
  the constraint is load-bearing.
- **A gotcha or footgun** — reverting this reintroduces a bug (ideally one the tests do not catch).
- **The debugging cue** — "if you see X wrong, it is set (or deliberately left) here."

Apply "never longer than the code" literally to **constants**: a constant is ONE line of code, so
its comment gets AT MOST one line — the decode of the value or the footgun, nothing else. What the
consumer does when the threshold fires (who wins, what gets disclosed, what runs next) lives at the
consumer.

## Examples

**Delete** — the line already speaks for itself:

```python
# Before
# transport="rest": gRPC stalls on multi-MB payloads.
client = ServiceClient(client_options=opts, transport="rest")

# After
client = ServiceClient(client_options=opts, transport="rest")
```

**Distill to the debugger's lens** — stop narrating the algorithm; add the "if you see X wrong" cue:

```
Before (narrates the algorithm):
  "...anchors a crop on the OCR line of the room number, crops that room out of the full-res
  image, asks the model a binary question, and rewrites only that entry's type..."

After (orients the debugger):
  Fixes model misreads between look-alike fixtures in numbered rooms: the model classifies them
  off the whole sheet downscaled, where they look alike, so this pass re-decides each from a
  high-res crop.

  If a numbered room's fixture type looks wrong, this is where it was set (or deliberately left).
```

**Compress while keeping the ordering why** — in a serial pipeline each step keeps one line stating
its ordering constraint, not a retelling of what it does:

```python
# Before: 3-4 lines narrating what the step does and why
# After
# Before area: an annotation tag inside a real room's box would poison the neighbour guard.
run_annotation_pass(...)
```

## Running the check

Sweep a file or a diff comment by comment and apply the two-pass filter. Whenever a unit's comments
outweigh its code, there is almost always something to prune. After editing, confirm that only
comments and docstrings changed — for example, compare the AST with docstrings stripped so no logic
moved — and run the test suite.