# MCP Setup

The project MCP config intentionally includes only a local Playwright server. It is useful for localhost browser checks of docs or API pages and does not require project secrets.

Do not add database, DigitalOcean, production API, or credential-bearing MCP servers to tracked `.mcp.json`.

Recommended opt-ins:

- GitHub: configure user-scoped MCP or Claude's GitHub integration for PR and issue work.
- MySQL: configure user-scoped or local-only read-only MCP after creating a read-only development database user.
- Browser: use the checked-in `playwright-local` server for localhost smoke checks only.

Store credentials in user-scoped Claude config, ignored local files, or environment variables. Never commit them.
