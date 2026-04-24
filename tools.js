export const tools = [
  { name:'skill_agent_architect',    description:'Design autonomous multi-agent systems — topology, orchestration, ReAct loops, parallel fan-out.',           inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_ai_product_design',  description:'Design AI-native products — model selection, AI UX, confidence UI, fallback handling, roadmapping.',           inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_api_patterns',       description:'Design REST and GraphQL APIs — auth, versioning, rate limiting, OpenAPI specs.',                               inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_autonomous_loop',    description:'Implement ReAct and Plan-Execute loops — goal decomposition, iteration limits, failure recovery.',              inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_copywriting',        description:'Write high-converting copy — landing pages, email sequences, cold outreach, product listings.',                inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_launch_strategy',    description:'Plan GTM launches — beta rollout, waitlist building, day-1 revenue, channel selection.',                       inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_autonomous_build',   description:'PRD to deployed product — autonomous full SDLC, zero human intervention mode.',                                inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_mcp_builder',        description:'Build MCP servers — tool schema, stdio/SSE transport, Claude Desktop registration.',                          inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_memory_architect',   description:'Build agent memory — episodic/semantic/procedural memory, vector stores, persistent state.',                  inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_parallel_agents',    description:'Orchestrate parallel agent workloads — fan-out, aggregation, conflict resolution, token budgets.',            inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_pricing_strategy',   description:'Design pricing — SaaS tiers, usage-based, freemium, marketplace pricing, margin analysis.',                   inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_prompt_engineer',    description:'Design production LLM prompts — system prompts, few-shot, chain-of-thought, XML structuring.',                inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_rag_engineer',       description:'Build RAG pipelines — chunking, embeddings, vector DBs, retrieval tuning, hybrid search.',                    inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_saas_launcher',      description:'Launch Micro-SaaS — niche validation, MVP scoping, tech stack, path to first revenue.',                       inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_seo_growth',         description:'Drive SEO and programmatic growth — keyword research, content architecture, organic revenue.',                 inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_senior_fullstack',   description:'Write production fullstack code — React, TypeScript, Node.js, Python, Flask, PostgreSQL, deployment.',         inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_software_architect', description:'System design — monolith vs microservices, DB schema, scalability, caching, queues.',                         inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_stripe_fintech',     description:'Integrate payments — Stripe subscriptions, webhooks, metered billing, marketplace payouts.',                  inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_systematic_debug',   description:'Debug systematically — error analysis, reproduction steps, hypothesis testing, log analysis.',                inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } },
  { name:'skill_workflow_automation',description:'Build automations — n8n, Make, Zapier, webhooks, cron jobs, bash scripting.',                                 inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'} }, required:['task'] } }
];
export const agentTools = [
  { name:'invoke_conductor', description:'Invoke CONDUCTOR — lead orchestrator. Routes tasks, assigns agents, status reports, prioritization, cross-project decisions.',    inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'}, mode:{type:'string',enum:['fast','prism','loop']} }, required:['task'] } },
  { name:'invoke_forge',     description:'Invoke FORGE — engineering lead. Builds, debugs, architects, ships code. Use for: write this, fix this, build this.',            inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'}, mode:{type:'string',enum:['fast','prism','loop']} }, required:['task'] } },
  { name:'invoke_prophecy',  description:'Invoke PROPHECY — research and synthesis. Market research, opportunity analysis, competitive intelligence.',                      inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'}, mode:{type:'string',enum:['fast','prism','loop']} }, required:['task'] } },
  { name:'invoke_pulse',     description:'Invoke PULSE — marketing and content. Fiverr listings, copywriting, SEO, social content, launch strategy.',                      inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'}, mode:{type:'string',enum:['fast','prism','loop']} }, required:['task'] } },
  { name:'invoke_lock',      description:'Invoke LOCK — risk and security gatekeeper. Go/no-go decisions, risk assessment, constraint checking.',                          inputSchema:{ type:'object', properties:{ task:{type:'string'}, context:{type:'string'}, mode:{type:'string',enum:['fast','prism','loop']} }, required:['task'] } },
];
export const ROLES = {
  skill_agent_architect:'Elite AI agent systems architect.',
  skill_ai_product_design:'Senior AI product designer.',
  skill_api_patterns:'Senior API architect.',
  skill_autonomous_loop:'Agent loop specialist.',
  skill_copywriting:'Elite direct-response copywriter.',
  skill_launch_strategy:'GTM strategist.',
  skill_autonomous_build:'Autonomous full-stack engineer.',
  skill_mcp_builder:'MCP server specialist.',
  skill_memory_architect:'Agent memory expert.',
  skill_parallel_agents:'Parallel orchestration expert.',
  skill_pricing_strategy:'Pricing strategist.',
  skill_prompt_engineer:'Production prompt engineer.',
  skill_rag_engineer:'RAG pipeline engineer.',
  skill_saas_launcher:'Micro-SaaS specialist.',
  skill_seo_growth:'SEO growth expert.',
  skill_senior_fullstack:'Senior fullstack engineer.',
  skill_software_architect:'Principal architect.',
  skill_stripe_fintech:'Payments specialist.',
  skill_systematic_debug:'Debug specialist.',
  skill_workflow_automation:'Automation engineer.',
  invoke_conductor:'CONDUCTOR — You are the lead orchestrator and executive decision-maker. You route tasks, synthesize output, make go/no-go calls, and keep the operation focused on revenue. Direct, decisive, no fluff. Bottom line first, always.',
  invoke_forge:    'FORGE — You are the engineering lead. You build, debug, and ship production-quality code. Practical always beats theoretical. Write code first, explain after.',
  invoke_prophecy: 'PROPHECY — You are the research and synthesis engine. You analyze markets, scan opportunities, and surface insights with evidence. Distinguish clearly between data, inference, and speculation. No guessing presented as fact.',
  invoke_pulse:    'PULSE — You are the marketing and content lead. You write copy that converts, build Fiverr listings that get clicks, and plan launches that generate revenue on day one.',
  invoke_lock:     'LOCK — You are the risk gatekeeper. You assess risk before action, enforce constraints, and deliver clear go/no-go recommendations with reasoning. You are a filter, not a blocker.',
};
export const AGENT_DEFAULT_MODES = {
  invoke_conductor:'prism',
  invoke_forge:'loop',
  invoke_prophecy:'prism',
  invoke_pulse:'fast',
  invoke_lock:'fast',
};
export const AGENT_TOOLS_SET = new Set(Object.keys(AGENT_DEFAULT_MODES));
export const PRISM_TOOLS = new Set(['skill_agent_architect','skill_software_architect','skill_ai_product_design','skill_launch_strategy','skill_pricing_strategy','skill_saas_launcher']);
export const LOOP_TOOLS  = new Set(['skill_autonomous_build','skill_autonomous_loop']);
export const PRISM_KEYWORDS = ['strategy','decide','should i','best way','how to build','design','plan','architect','which approach','compare'];
