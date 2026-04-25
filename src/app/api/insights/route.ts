import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { company, position, notes } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local' },
        { status: 400 }
      );
    }

    const insight = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `You are a career coach helping someone prepare for a job interview. Analyze this job application and provide specific, actionable interview preparation tips.

Company: ${company}
Position: ${position}
Notes: ${notes || 'No additional notes'}

Provide:
1. Key strengths to highlight in the interview
2. Top 3 areas to prepare based on this role
3. 3 tough questions you might be asked and how to answer them
4. 2 smart questions to ask the hiring team

Format your response clearly with headers and bullet points.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      insight: insight.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}
