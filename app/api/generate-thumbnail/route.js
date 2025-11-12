import { NextResponse } from 'next/server';

// This mock generator returns a PNG data URL generated from an SVG with gradient
// If a real provider key is present, you could extend to call Gemini/other providers.

function svgToPngDataUrl({ prompt }) {
  const colors = [
    ['#4f46e5', '#22d3ee'],
    ['#ef4444', '#f59e0b'],
    ['#10b981', '#3b82f6'],
    ['#8b5cf6', '#ec4899'],
  ];
  const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];
  const safePrompt = (prompt || 'Your Video').slice(0, 80).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g filter="url(#shadow)">
      <rect x="80" y="80" width="1120" height="560" rx="24" fill="rgba(255,255,255,0.1)"/>
    </g>
    <text x="640" y="380" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="72" fill="#fff" text-anchor="middle">
      ${safePrompt}
    </text>
    <circle cx="1140" cy="100" r="40" fill="#fff"/>
    <polygon points="1130,85 1160,100 1130,115" fill="#ef4444"/>
  </svg>`;
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export async function POST(req) {
  const { prompt } = await req.json();

  // TODO: Add real provider integration using env keys if present
  const imageDataUrl = svgToPngDataUrl({ prompt });
  return NextResponse.json({ imageDataUrl });
}
