# Annual Scorecard Data Rules

Applies to `scorecard.csv`, `app/data/scorecard.csv`, `app/api/v1/domain/update.js`, `app/api/v1/domain/scorecard.js`, `app/models/scorecard_*.js`, `app/migrations/*scorecard*.js`, and scorecard tests.

## Required Workflow

1. Read `.claude/skills/annual-scorecard-update/SKILL.md`.
2. Run `node .claude/skills/annual-scorecard-update/scripts/scorecard-column-audit.js`.
3. Identify whether new columns are raw data, calculated fields, yearly series, source metadata, policy text, or response-only derived values.
4. Map every persisted column to exactly one `scorecard_*` model/table.
5. Add schema changes as additive migrations only.
6. Update the `cleanData` mapping in `app/api/v1/domain/update.js`.
7. Update aggregate calculations only when the new column must influence existing totals, latest-year selection, grades, or public response shape.
8. Add or update focused tests around changed behavior.

## Annual Year Columns

Year-suffixed columns usually require updates in multiple places:

- `SCORECARD_COLUMNS` in `app/api/v1/domain/update.js`.
- The correct `app/models/scorecard_*.js` file.
- A new additive migration.
- The matching `cleanData` section in `update.js`.
- Helper calculations such as total arrests, low-level arrests, police shootings, less-lethal-force change, or latest budget selection.
- `getStates()` totals and response fields in `app/api/v1/domain/scorecard.js` if the public state summary exposes the annual series.

Do not only append a CSV header. A header-only change passes no useful data into the database.

## Import Safety

- Preserve exact CSV header order unless intentionally changing `SCORECARD_COLUMNS`.
- Do not relax `validateScorecard()` without a strong reason.
- Keep CSV `carotid_restraints_YYYY` mapped to internal `neck_restraints_YYYY` unless the app contract is intentionally migrated.
- Only add future-year optional fields to `SCORECARD_COLUMNS` when those columns exist in the actual CSV header.
- Do not run clean imports against production or shared databases from Claude.
- Do not delete CSVs or caches outside the app's existing import path.
- Treat `app/data/*.csv` as generated/ignored runtime data.

## Public API Safety

- Assume response fields are public contract unless proven otherwise.
- If adding public fields, document which endpoint exposes them.
- If not exposing a stored field directly, say so in the change summary.
