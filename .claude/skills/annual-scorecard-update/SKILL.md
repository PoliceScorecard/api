---
name: annual-scorecard-update
description: Guide annual Police Scorecard CSV/schema updates in this legacy API. Use when adding or reviewing new scorecard.csv columns, new year-suffixed fields, scorecard_* model or migration changes, UpdateDomain import mapping, or public scorecard API response changes.
---

# Annual Scorecard Update

Use this skill before editing annual scorecard data code.

## First Checks

1. Run:

   ```bash
   node .claude/skills/annual-scorecard-update/scripts/scorecard-column-audit.js
   ```

2. If a new CSV file is provided, run this against that exact file. `--csv` intentionally audits only the supplied file:

   ```bash
   node .claude/skills/annual-scorecard-update/scripts/scorecard-column-audit.js --csv /absolute/path/to/new-scorecard.csv
   ```

3. Read the relevant section of `.claude/skills/annual-scorecard-update/references/scorecard-data-map.md`.

## Change Map

Every persisted CSV column needs all of these decisions:

- CSV header: exact name and position in `SCORECARD_COLUMNS`.
- Destination: one `scorecard_*` model/table.
- Type: integer, float, boolean, URL, email, phone, text, or string.
- Migration: additive nullable column unless explicitly safe otherwise.
- Import mapping: matching `cleanData` section in `app/api/v1/domain/update.js`.
- API exposure: direct nested report output, aggregate state output, map output, or not exposed.
- Test: validation, import mapping/calculation, or response shape.

## Destination Hints

- Agency identity, contacts, populations, completeness, and advocacy tip -> `scorecard_agency`.
- Arrest totals, demographic arrests, drug arrests, low-level arrest rates/disparities -> `scorecard_arrests`.
- Murder solved/unsolved and homicide totals -> `scorecard_homicide`.
- Jail population, ICE transfers, and jail deaths -> `scorecard_jail`.
- Complaints and complaint source data -> `scorecard_police_accountability`.
- Budgets, officers, fines/forfeitures, settlements, budget source data -> `scorecard_police_funding`.
- Less-lethal force, shootings, people killed, force tools, and deadly force disparities -> `scorecard_police_violence`.
- Policy booleans, policy text, policy links, and union contract fields -> `scorecard_policy`.
- Scores, grades, percentiles, calculated rates, public rollup metrics -> `scorecard_report`.

## Year-Suffixed Fields

When adding a new year such as `_2024`, search every existing `_2023` occurrence for the same family and update each relevant location. Common families:

- `arrests_YYYY`
- `low_level_arrests_YYYY`
- `civilian_complaints_*_YYYY`
- `use_of_force_complaints_*_YYYY`
- `discrimination_complaints_*_YYYY`
- `criminal_complaints_*_YYYY`
- `complaints_in_detention_*_YYYY`
- `less_lethal_force_YYYY`
- `police_shootings_YYYY`
- `taser_YYYY`
- `impact_weapons_and_projectiles_YYYY`
- `neck_restraints_YYYY`
- `carotid_restraints_YYYY` in CSV aliases to internal `neck_restraints_YYYY`
- `chemical_spray_YYYY`
- `K9_deployments_YYYY`
- `total_officers_YYYY`
- `total_budget_YYYY`
- `fines_forfeitures_YYYY`
- `housing_budget_YYYY`
- `health_budget_YYYY`
- `police_budget_YYYY`
- `corrections_budget_YYYY`

Also update helper calculations when the field participates in totals or latest-year selection:

- `__calcLessLethalForceChange`
- `__calcPoliceShootingsIncidents`
- `__calcTotalArrests`
- `__calcTotalLowLevelArrests`
- latest budget selection blocks in `importScorecard`
- `ScorecardDomain.getStates()` annual totals, if exposed publicly

The 2024-2025 import supports optional future 2025 complaint columns even when the current strict CSV header only contains 2024 complaint columns. Do not add optional future columns to `SCORECARD_COLUMNS` until they actually exist in the incoming CSV header.

## Migration Rules

- Add new migrations instead of editing historical migrations.
- Keep new columns nullable unless existing import behavior guarantees a value for all rows.
- Match existing data types in nearby fields.
- Include a rollback that removes only the added columns.

## Verification

Run the audit script again after edits. Then run the narrowest useful tests:

```bash
npm run lint
npm test -- --grep scorecard
```

If the grep command is incompatible with the local npm script behavior, run `npm test` and report that broader validation was used.

## Summary Checklist

In the final summary, include:

- CSV columns added or changed
- tables/models changed
- migrations added
- import mappings changed
- API fields changed or intentionally not exposed
- tests and audits run
- anything not validated
