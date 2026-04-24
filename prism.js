// PRISM — structured multi-perspective reasoning for strategic and complex tasks
// P: Problem framing  R: Research angles  I: Insights  S: Strategy  M: Map next actions

async function callClaude(system, userMsg, key, maxTokens = 1500) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-opus-4-20250514', max_tokens: maxTokens, system, messages: [{ role: 'user', content: userMsg }] })
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return (await res.json()).content?.[0]?.text || '';
}

export async function runPRISM(task, context, role, ownerContext, key) {
  const base = `Role: ${role}\nOwner context:\n${ownerContext}`;

  // P — Problem framing
  let framing = '';
  try {
    framing = await callClaude(
      `${base}\nYou are a problem framing specialist. Break down the task into: core objective, constraints, success criteria, and 2-3 key unknowns. Be concise.`,
      `Task: ${task}${context ? '\nContext: ' + context : ''}`
    , key);
  } catch { /* non-fatal — proceed without framing */ }

  // R + I — Research angles and insights (parallel via Promise.allSettled)
  const [anglesResult, insightsResult] = await Promise.allSettled([
    callClaude(
      `${base}\nIdentify 3-4 distinct analytical perspectives or research angles relevant to this task. For each, state: perspective name, key question it answers, and 1-2 critical data points.`,
      `Task: ${task}\nFraming:\n${framing}`
    , key),
    callClaude(
      `${base}\nGiven the task and framing, surface the 3-5 most important non-obvious insights. Distinguish clearly: [FACT], [INFERENCE], or [SPECULATION] for each.`,
      `Task: ${task}\nFraming:\n${framing}`
    , key),
  ]);
  const angles   = anglesResult.status   === 'fulfilled' ? anglesResult.value   : '';
  const insights = insightsResult.status === 'fulfilled' ? insightsResult.value : '';

  // S + M — Strategy and action map (synthesis)
  const synthesis = await callClaude(
    `${base}\nYou are a synthesis engine running PRISM analysis. Format your response:\n[PRISM MODE]\nBOTTOM LINE: [one sentence]\n\nSTRATEGY:\n[3-5 numbered strategic recommendations, confidence X/10 each]\n\nACTION MAP:\n[ordered next actions]\n\nNEXT ACTION → [immediate first step]`,
    `Task: ${task}\n\nProblem framing:\n${framing}\n\nAnalysis angles:\n${angles}\n\nKey insights:\n${insights}`
  , key, 2500);

  return { text: synthesis, framing, angles, insights };
}
