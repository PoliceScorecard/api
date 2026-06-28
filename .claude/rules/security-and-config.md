# Security And Config Rules

Applies to `.env*`, `app/config/`, `.claude/settings*`, `.mcp*`, deployment docs, and scripts.

- Do not commit real API keys, passwords, private keys, tokens, OAuth secrets, production URLs with credentials, or signing secrets.
- This repo is a git repo, so tracked files must be treated as shareable.
- Use environment variables, ignored local config, user-scoped Claude MCP config, or documented setup steps for secrets.
- Do not read ignored local production/staging config unless the user explicitly asks.
- Do not modify deployment scripts or deployment instructions without explicit approval.
- Do not call production API endpoints or DigitalOcean deploy scripts from Claude unless explicitly asked.

Tracked `docker.json` and `test.json` are development fixtures. Do not copy their values into new production or personal config.
