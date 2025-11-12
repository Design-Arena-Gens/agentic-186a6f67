"use client";

import { useState } from 'react';

export default function TitleDescriptionGenerator({ onSave }) {
  const [prompt, setPrompt] = useState('How to learn React fast');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      setIdeas(data.titles || []);
      setDescription(data.description || '');
    } catch (e) {
      setError('Generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!ideas.length && !description) return;
    const payload = { id: crypto.randomUUID(), type: 'text', prompt, titles: ideas, description, createdAt: Date.now() };
    onSave?.(payload);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="font-semibold text-lg">Title & Description Generator</h3>
        <p className="text-gray-600">Get catchy titles and an engaging description.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={5} className="w-full rounded-md border px-3 py-2" placeholder="What is your video about?" />
            <div className="flex gap-3">
              <button disabled={loading} onClick={generate} className="btn btn-primary">{loading ? 'Generating...' : 'Generate'}</button>
              <button onClick={handleSave} disabled={loading || (!ideas.length && !description)} className="btn btn-outline">Save</button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Titles</h4>
              <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                {ideas.map((t, i) => (<li key={i}>{t}</li>))}
                {!ideas.length && <li className="text-gray-500 list-none">No titles yet</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Description</h4>
              <textarea readOnly rows={6} value={description} className="w-full rounded-md border px-3 py-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
