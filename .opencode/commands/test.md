---
description: Prove it works. Run the test-driven loop and the task's gate commands; tests are proof.
argument-hint: "[task slug or scope]"
---

Prove it works.

1. Load `tdd` for the red→green loop; route API test writing to `test-agent`.
2. Run the gates:
   - API: `source venv/bin/activate && python test_runner.py --settings=test_settings --keepdb`
   - API schema: `python manage.py spectacular --validate --fail-on-warn`
   - Web: `bun lint` && `bun run build`
   - Structure: `python3 .opencode/bin/validate-structure.py`
3. Confirm every card Checklist item is satisfied and named consumers still work.
4. Output: pass/fail per check + remaining gaps.

Tests are proof, not types alone.
