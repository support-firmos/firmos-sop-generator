// app/api/generate-sop/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // This helps with the timeout issue

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.SITE_URL || 'https://firmos-sop-generator.vercel.app',
        'X-Title': 'FirmOS SOP Generator',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-qwen-32b',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error('Error in SOP generation:', error);
    return NextResponse.json({ error: 'Failed to generate SOP' }, { status: 500 });
  }
}