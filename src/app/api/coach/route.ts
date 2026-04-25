import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert technical interview coach. Help candidates practice and improve their interview answers. Provide constructive, specific feedback with examples and suggestions for improvement.',
        },
        {
          role: 'user',
          content: `Help me practice answering this interview question:\n\n"${question}"\n\nProvide:\n1. A strong example answer structure using the STAR method\n2. Common mistakes to avoid\n3. How to make this answer more impressive\n4. Follow-up questions they might ask`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      feedback: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate coaching' }, { status: 500 });
  }
}
