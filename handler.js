import { tools, agentTools, ROLES, PRISM_TOOLS, LOOP_TOOLS, PRISM_KEYWORDS, AGENT_TOOLS_SET, AGENT_DEFAULT_MODES } from './tools.js';
import { runPRISM } from './prism.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
function loadOwnerContext() {
  const paths = [join(__dirname,'..','..','memory','OWNER_CONTEXT.md'), join(__dirname,'..','memory','OWNER_CONTEXT.md'), process.env.OWNER_CONTEXT_PATH||''];
  for (const p of paths) { if (p && existsSync(p)) return readFileSync(p,'utf8'); }
  return '[OWNER_CONTEXT.md not found]';
}
const OWNER_CONTEXT = loadOwnerContext();
const allTools = [...tools, ...agentTools];
export async function handleTool(name, args) {
  if (!allTools.find(t=>t.name===name)) return { content:[{type:'text',text:`Error: tool '${name}' not found`}], isError:true };
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { content:[{type:'text',text:'Error: ANTHROPIC_API_KEY not set'}], isError:true };
  const role = ROLES[name]||'AI specialist';
  const task = args.task, context = args.context||'';
  const forceMode = args.mode;
  try {
    if (AGENT_TOOLS_SET.has(name)) {
      const mode = forceMode || AGENT_DEFAULT_MODES[name];
      if (mode==='loop') return await runLoop(task,context,role,key);
      if (mode==='prism') { const r=await runPRISM(task,context,role,OWNER_CONTEXT,key); return {content:[{type:'text',text:r.text}]}; }
      return await fastPath(task,context,role,key);
    }
    const mode = forceMode || (LOOP_TOOLS.has(name)||task.length>300?'loop':PRISM_TOOLS.has(name)||PRISM_KEYWORDS.some(k=>task.toLowerCase().includes(k))?'prism':'fast');
    if (mode==='loop') return await runLoop(task,context,role,key);
    if (mode==='prism') { const r=await runPRISM(task,context,role,OWNER_CONTEXT,key); return {content:[{type:'text',text:r.text}]}; }
    return await fastPath(task,context,role,key);
  } catch(e) { return {content:[{type:'text',text:`Handler error: ${e.message}`}],isError:true}; }
}
async function fastPath(task,context,role,key) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST', headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},
    body:JSON.stringify({ model:'claude-opus-4-20250514', max_tokens:4096,
      system:`You are a specialist AI. Role: ${role}\nOwner context:\n${OWNER_CONTEXT}\nBottom line first. Numbered steps. Confidence X/10 on recommendations. End: NEXT ACTION → [step]`,
      messages:[{role:'user',content:`Task: ${task}${context?'\nContext: '+context:''}`}] })
  });
  if (!res.ok) return {content:[{type:'text',text:`API error ${res.status}`}],isError:true};
  return {content:[{type:'text',text:(await res.json()).content?.[0]?.text||'No response'}]};
}
async function runLoop(task,context,role,key) {
  const call = async(sys,msg) => { const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:'claude-opus-4-20250514',max_tokens:2000,system:sys,messages:[{role:'user',content:msg}]})}); if(!r.ok) throw new Error(`API ${r.status}`); return (await r.json()).content?.[0]?.text||''; };
  let plan;
  try { const pt=await call(`Task planner. Role: ${role}\nOwner context:\n${OWNER_CONTEXT}\nReturn ONLY a JSON array: [{"step":1,"action":"...","expected_output":"..."}]`,`Task: ${task}${context?'\nContext: '+context:''}`); plan=JSON.parse(pt); } catch { return fastPath(task,context,role,key); }
  let acc=context; const steps=[];
  for (const s of plan.slice(0,5)) { try { const out=await call(`Executing step ${s.step}. Role: ${role}\nOwner context:\n${OWNER_CONTEXT}\nFull task: ${task}\nExpected: ${s.expected_output}`,`Execute: ${s.action}\nContext so far:\n${acc}`); steps.push({...s,output:out}); acc+=`\nStep ${s.step} output:\n${out}`; } catch { break; } }
  try { const synth=await call(`Synthesis engine. Role: ${role}\nOwner context:\n${OWNER_CONTEXT}\nFormat: [LOOP MODE — N steps]\nRESULT: [summary]\n[full output]\nNEXT ACTION → [step]`,`Task: ${task}\n\n${steps.map(s=>`Step ${s.step} (${s.action}):\n${s.output}`).join('\n\n')}`); return {content:[{type:'text',text:synth}]}; }
  catch { return {content:[{type:'text',text:steps.map(s=>`**Step ${s.step}: ${s.action}**\n${s.output}`).join('\n\n---\n\n')}]}; }
}
