import { useState } from 'react'
import { callReplicate, callHuggingFace } from '@/lib/api'

export default function DevPlayground() {
  const [replicateModel, setReplicateModel] = useState('stability-ai/sdxl')
  const [replicateVersion, setReplicateVersion] = useState('')
  const [replicatePrompt, setReplicatePrompt] = useState('Astronaut riding a horse')
  const [hfRepo, setHfRepo] = useState('gpt2')
  const [hfInput, setHfInput] = useState('Hello from AI Creator Hub')
  const [out, setOut] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const runReplicate = async () => {
    setLoading(true)
    setOut('')
    setImg('')
    try {
      const body: any = { input: { prompt: replicatePrompt } }
      if (replicateModel) body.model = replicateModel
      if (replicateVersion) body.version = replicateVersion
      const res = await callReplicate({ model: body.model, version: body.version }, body.input)
      const output = res.output
      if (Array.isArray(output) && output.length > 0 && typeof output[0] === 'string') {
        setImg(output[0])
      } else {
        setOut(JSON.stringify(res, null, 2))
      }
    } catch (e) {
      setOut(String(e))
    } finally {
      setLoading(false)
    }
  }

  const runHF = async () => {
    setLoading(true)
    setOut('')
    setImg('')
    try {
      const res = await callHuggingFace(hfRepo, hfInput)
      setOut(JSON.stringify(res, null, 2))
    } catch (e) {
      setOut(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Dev Playground</h1>

      <div className="border rounded p-4 space-y-3">
        <div className="font-medium">Replicate</div>
        <div className="grid grid-cols-3 gap-2">
          <input className="border rounded px-2 py-1" placeholder="model (owner/name)" value={replicateModel} onChange={(e)=>setReplicateModel(e.target.value)} />
          <input className="border rounded px-2 py-1" placeholder="version (optional)" value={replicateVersion} onChange={(e)=>setReplicateVersion(e.target.value)} />
          <input className="border rounded px-2 py-1" placeholder="prompt" value={replicatePrompt} onChange={(e)=>setReplicatePrompt(e.target.value)} />
        </div>
        <button onClick={runReplicate} disabled={loading} className="px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-50">Run Replicate</button>
      </div>

      <div className="border rounded p-4 space-y-3">
        <div className="font-medium">Hugging Face Inference</div>
        <div className="grid grid-cols-2 gap-2">
          <input className="border rounded px-2 py-1" placeholder="repo id (e.g. gpt2)" value={hfRepo} onChange={(e)=>setHfRepo(e.target.value)} />
          <input className="border rounded px-2 py-1" placeholder="input text" value={hfInput} onChange={(e)=>setHfInput(e.target.value)} />
        </div>
        <button onClick={runHF} disabled={loading} className="px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-50">Run HF</button>
      </div>

      {img && (
        <div>
          <img src={img} alt="output" className="max-w-md rounded" />
        </div>
      )}
      {out && (
        <pre className="whitespace-pre-wrap text-sm border rounded p-3 bg-muted">{out}</pre>
      )}
    </div>
  )
}


