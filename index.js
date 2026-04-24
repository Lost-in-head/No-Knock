import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname,'..', '.env');
if (existsSync(envPath)) {
  readFileSync(envPath,'utf8').split('\n').forEach(line => {
    const t=line.trim(); if (!t||t.startsWith('#')) return;
    const eq=t.indexOf('='); if(eq===-1) return;
    const k=t.slice(0,eq).trim(), v=t.slice(eq+1).trim();
    if (k && !process.env[k]) process.env[k]=v;
  });
}
const contextPath = join(__dirname,'..','..','memory','OWNER_CONTEXT.md');
import { tools, agentTools } from './tools.js';
import { handleTool } from './handler.js';
const allTools = [...tools, ...agentTools];
const server = new Server({ name:'ai-team-core', version:'1.0.0' },{ capabilities:{ tools:{} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: allTools.map(t=>({name:t.name,description:t.description,inputSchema:t.inputSchema})) }));
server.setRequestHandler(CallToolRequestSchema, async (req) => handleTool(req.params.name, req.params.arguments));
const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[AI-TEAM-CORE] ${allTools.length} tools active (${tools.length} skills + ${agentTools.length} agents) | context: ${existsSync(contextPath)?'loaded ✓':'MISSING'}`);
