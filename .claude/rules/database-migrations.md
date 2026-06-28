# Database And Migration Rules

Applies to `app/models/`, `app/migrations/`, `.sequelizerc`, and database-related config.

- Prefer additive migrations: `addColumn`, new nullable columns, compatible indexes.
- Do not drop columns, rename columns, change enum values, or rewrite historical migrations without explicit approval.
- Keep Sequelize model attributes and migrations synchronized.
- Use existing Sequelize 5 style and naming conventions.
- Preserve `underscored`, `created_date`, `modified_date`, and paranoid deletion behavior from `app/config/sequelize.js`.
- Do not run `npm run migrate`, `npm run migrate:rollback`, or seed commands against unknown databases.
- If a migration is needed, call out the affected table and rollback behavior in the summary.

For annual scorecard changes, new columns should generally be nullable unless the current import code and all historical data guarantee values.
