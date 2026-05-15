import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { company, position, jobDescription } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local' },
        { status: 400 }
      );
    }

    if (!company || !position || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: company, position, jobDescription' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a professional, personalized cover letter for this job application. Make it compelling and highlight relevant qualifications.

Company: ${company}
Position: ${position}
Job Description: ${jobDescription}

Format as a proper business letter with:
- Professional greeting
- Opening paragraph showing enthusiasm
- 2-3 body paragraphs highlighting relevant skills
- Strong closing paragraph
- Professional sign-off

Target length: 250-300 words`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    return NextResponse.json({
      coverLetter: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
