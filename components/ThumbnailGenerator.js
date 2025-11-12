"use client";

import { useState } from 'react';

export default function ThumbnailGenerator({ onSave }) {
  const [prompt, setPrompt] = useState('Epic sci-fi adventure on Mars');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      setImageUrl(data.imageDataUrl);
    } catch (e) {
      setError('Generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!imageUrl) return;
    const payload = { id: crypto.randomUUID(), type: 'thumbnail', prompt, imageUrl, createdAt: Date.now() };
    onSave?.(payload);
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'thumbnail.png';
    a.click();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="font-semibold text-lg">AI Thumbnail Generator</h3>
        <p className="text-gray-600">Enter a description and generate a thumbnail.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={5} className="w-full rounded-md border px-3 py-2" placeholder="Describe your video..." />
            <div className="flex gap-3">
              <button disabled={loading} onClick={generate} className="btn btn-primary">{loading ? 'Generating...' : 'Generate'}</button>
              <button disabled={!imageUrl} onClick={handleSave} className="btn btn-outline">Save</button>
              <button disabled={!imageUrl} onClick={handleDownload} className="btn btn-outline">Download</button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          <div className="aspect-video rounded-lg border bg-gray-100 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="Generated thumbnail" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">Your generated image will appear here</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
