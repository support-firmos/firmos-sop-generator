// src/app/api/generate-sop/route.ts
import { NextResponse } from 'next/server';

// Set maximum duration to 60 seconds
export const maxDuration = 60;

// Use Edge runtime for better performance with long-running requests
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://firmos-sop-generator.vercel.app',
        'X-Title': 'FirmOS SOP Generator',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-nemo',
        messages: [{ role: 'user', content: prompt }],
        stream: true, // Enable streaming
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });
    
    // Return the stream response directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in SOP generation:', error);
    return NextResponse.json({ error: 'Failed to generate SOP' }, { status: 500 });
  }
}