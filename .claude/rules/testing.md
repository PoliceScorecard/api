# Testing Rules

Applies to `test/`, changed route/domain files, and package scripts.

- Prefer targeted tests first, then broader tests when behavior or public response shape changes.
- Use existing Mocha/Chai/Sinon patterns.
- Keep Node 12 compatibility.
- Do not update snapshots or expected API shapes casually; inspect why they changed.
- Run `npm run lint` for code edits when feasible.
- Run `npm test` for domain or model changes when feasible.
- The docs mention 70 percent coverage, but `package.json` currently configures nyc thresholds at 50 percent. Do not change either without a separate cleanup request.

For annual scorecard updates, add focused tests for any changed calculation, public response field, or validation behavior.
