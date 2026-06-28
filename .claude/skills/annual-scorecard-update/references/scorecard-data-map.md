# Scorecard Data Map

## Core Files

- `app/data/scorecard.csv`: runtime import source; ignored by git.
- `scorecard.csv`: legacy root copy; do not treat it as the import source.
- `app/api/v1/domain/update.js`: hard-coded header list, CSV validation, row parsing, calculations, and upserts.
- `app/api/v1/domain/scorecard.js`: public scorecard response shaping and state aggregates.
- `app/api/v1/routes/update.js`: admin import endpoint.
- `app/api/v1/routes/scorecard.js`: public scorecard endpoints.
- `app/models/scorecard_*.js`: Sequelize table definitions.
- `app/migrations/*scorecard*.js`: original scorecard table migrations.

## Import Flow

1. `/v1/update/scorecard` calls `UpdateDomain.downloadScorecard()`.
2. `downloadScorecard()` confirms `app/data/scorecard.csv` exists and is readable.
3. `validateScorecard()` requires the first row to exactly match `SCORECARD_COLUMNS`.
4. `importScorecard()` parses rows, skips invalid/duplicate rows, derives calculated values, builds `cleanData`, and upserts agency plus child scorecard tables.
5. Successful import clears `.cache/*.cache`.

## Current Scorecard Tables

- `scorecard_agency`: identifying agency profile and population fields.
- `scorecard_arrests`: arrest metrics and low-level arrest metrics.
- `scorecard_homicide`: homicide solve/unsolved counts.
- `scorecard_jail`: jail population, ICE, and deaths.
- `scorecard_police_accountability`: complaints and complaint source fields.
- `scorecard_police_funding`: officers, budgets, fines, settlements, budget sources.
- `scorecard_police_violence`: force, shootings, people killed, disparity inputs.
- `scorecard_policy`: policy booleans/text/link fields.
- `scorecard_report`: grades, scores, percentiles, rates, and calculated rollups.

## Existing Fragile Areas

- `SCORECARD_COLUMNS` is a fixed ordered array; validation fails on order changes.
- The repo-root `scorecard.csv` can drift from the actual import source in `app/data/scorecard.csv`.
- Latest-year budget selection is hard-coded year by year.
- Several total calculations are hard-coded year by year.
- `getStates()` manually exposes and sums annual arrests and complaint fields.
- The old original migrations create tables from model `rawAttributes`; new changes should use new additive migrations, not historical rewrites.

## Naming Aliases

- CSV `carotid_restraints_YYYY` maps to internal `neck_restraints_YYYY` fields.
- Keep the `neck_restraints_YYYY` database/model/API naming unless the public application is migrated intentionally.
- The 2024-2025 update imports optional 2025 complaint fields as null when the current CSV does not have those headers yet.
