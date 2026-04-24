# No-Knock — AI Team MCP Server

An MCP (Model Context Protocol) server that exposes a collective of specialized AI agents and skill tools directly inside Claude Desktop (or any MCP-compatible host).

## Agents

| Agent | Role |
|---|---|
| **CONDUCTOR** | Lead orchestrator — routes tasks, makes go/no-go calls, drives revenue focus |
| **FORGE** | Engineering lead — builds, debugs, and ships production code |
| **PROPHECY** | Research & synthesis — market analysis, competitive intelligence, opportunity scanning |
| **PULSE** | Marketing & content — copy, Fiverr listings, SEO, launch strategy |
| **LOCK** | Risk gatekeeper — go/no-go decisions, constraint checking, security review |

## Skill Tools

20 specialist tools including: `skill_agent_architect`, `skill_senior_fullstack`, `skill_prompt_engineer`, `skill_rag_engineer`, `skill_mcp_builder`, `skill_saas_launcher`, `skill_launch_strategy`, `skill_pricing_strategy`, `skill_seo_growth`, `skill_copywriting`, `skill_stripe_fintech`, `skill_systematic_debug`, and more.

## Execution Modes

- **fast** — Single-shot Claude call, instant results
- **loop** — Plan-Execute-Synthesize loop (up to 5 steps), best for build tasks
- **prism** — Multi-perspective structured analysis (Problem → Research → Insights → Strategy → Map), best for strategic decisions

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file one directory above this project (or set env vars):
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Register in `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "no-knock": {
         "command": "node",
         "args": ["/path/to/No-Knock/index.js"]
       }
     }
   }
   ```

4. Start the server:
   ```bash
   npm start
   ```

## File Structure

```
No-Knock/
├── index.js      — MCP server entry point
├── handler.js    — Tool routing (fast / loop / prism mode selection)
├── prism.js      — PRISM multi-step reasoning engine
├── tools.js      — All tool and agent definitions + role prompts
└── package.json  — Node.js ES module config
```
