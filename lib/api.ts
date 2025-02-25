// lib/api.ts
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://firmos-sop-generator.vercel.app';
const SITE_NAME = 'FirmOS SOP Generator';

export const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': SITE_URL,
    'X-Title': SITE_NAME,
  },
});

export async function generateSOP(prompt: string): Promise<string> {
  try {
    const response = await openRouterClient.post('/chat/completions', {
      model: 'deepseek/deepseek-r1-distill-qwen-32b',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating SOP:', error);
    throw error;
  }
}