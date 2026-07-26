# Claude Code Instructions

This is a production legacy API for Police Scorecard. It receives public traffic and has external links into API responses, so treat compatibility as the default requirement.

@.claude/rules/annual-scorecard-data.md
@.claude/rules/database-migrations.md
@.claude/rules/testing.md
@.claude/rules/security-and-config.md
@.claude/rules/mcp-and-tools.md

## Project Shape

- Runtime: Node 12.12.0, npm 6, Express, Sequelize 5, MySQL 5.7, Elasticsearch 7.5.
- Entry point: `index.js` -> `app/server.js`.
- API routes: `app/api/v1/routes/`.
- Domain logic: `app/api/v1/domain/`.
- Sequelize models: `app/models/`.
- Migrations: `app/migrations/`.
- Tests: Mocha/Chai under `test/`.
- Main annual data path: `app/data/scorecard.csv` and `app/api/v1/domain/update.js`.

## Operating Rules

- Start with `git status --short --branch`.
- Re-read files immediately before editing them.
- Do not overwrite unrelated user changes.
- Prefer narrow, additive changes over refactors.
- Do not upgrade dependencies, runtime versions, build tools, database versions, or lint configuration unless explicitly asked.
- Do not run deploy scripts, destructive Elasticsearch commands, seed resets, rollback commands, or production API calls unless explicitly asked.
- Do not add secrets to tracked files. Keep credentials in ignored local config or user-scoped tool configuration.

## Common Commands

- `npm test` runs the full Mocha test suite.
- `npm run lint` runs ESLint.
- `npm run coverage` runs tests with nyc.
- `node .claude/skills/annual-scorecard-update/scripts/scorecard-column-audit.js` audits the scorecard CSV/header/model/import mapping.
- `docker-compose up --build` starts the local Docker stack, but it is slow and touches local containers.

## Annual Scorecard Updates

For CSV schema or annual data work, read `.claude/skills/annual-scorecard-update/SKILL.md` first and run the audit script before editing. The import pipeline is intentionally hard-coded and fragile: every new CSV column must be traced to its owner table, parser, model attribute, migration, import mapping, and API exposure decision.

Do not assume the repo-root `scorecard.csv` is used by the import path. `/update/scorecard` validates and imports `app/data/scorecard.csv` directly.
