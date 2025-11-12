import { NextResponse } from 'next/server';

function mockTitles(prompt) {
  const topic = (prompt || 'your topic').trim();
  const variants = [
    `Top 10 Secrets About ${topic}`,
    `${topic}: The Only Guide You Need`,
    `I Tried ${topic} So You Don?t Have To`,
    `${topic} in 10 Minutes (Beginner Friendly)`,
    `Stop Doing This with ${topic}!`,
    `The Truth About ${topic} (No One Tells You)`,
    `I Built This Using ${topic} (Shocking Results)`,
    `${topic} Tips & Tricks You Must Know`,
  ];
  return variants;
}

function mockDescription(prompt) {
  return [
    `In this video, we dive into ${prompt || 'today\'s topic'} with actionable strategies and real-world examples.`,
    'Timestamps:',
    '00:00 Intro',
    '00:45 Key Concepts',
    '05:20 Live Demo',
    '10:00 Pro Tips',
    '',
    'If you found this helpful, like and subscribe for more!'
  ].join('\n');
}

export async function POST(req) {
  const { prompt } = await req.json();

  // Optional: integrate OpenAI if OPENAI_API_KEY exists
  // For now, we return mock content to ensure zero-config usage.
  const titles = mockTitles(prompt);
  const description = mockDescription(prompt);

  return NextResponse.json({ titles, description });
}
