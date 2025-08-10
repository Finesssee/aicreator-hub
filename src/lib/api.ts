export async function callReplicate(modelOrVersion: { model?: string; version?: string }, input: Record<string, unknown>) {
  const res = await fetch('/api/replicate/predictions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...modelOrVersion, input, wait_mode: 'block' }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function callHuggingFace(repoId: string, inputs: unknown, parameters?: Record<string, unknown>) {
  const res = await fetch('/api/hf/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repo_id: repoId, inputs, parameters }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

