# MCP And Tool Rules

Project MCP configuration should stay conservative.

- The checked-in `.mcp.json` may include local, non-secret developer tools only.
- Do not add production database, production API, DigitalOcean, or credential-bearing MCP servers to tracked config.
- Use user-scoped Claude MCP config for GitHub, issue trackers, or personal credentials.
- Use a local read-only database MCP only after the user confirms the target is local/dev and credentials are stored outside tracked files.
- Browser/Playwright MCP usage must stay on local or explicitly requested URLs.

If a task needs a new MCP server, propose the server, scope, credentials location, and risk before adding it.
