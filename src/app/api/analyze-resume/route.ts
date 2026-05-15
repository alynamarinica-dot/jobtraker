import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Extragem textul simplu din fișier (pentru PDF-uri complexe e nevoie de biblioteci extra, 
    // dar pentru început citim textul de bază)
    const bytes = await file.arrayBuffer();
    const content = Buffer.from(bytes).toString('utf-8');

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", // sau "gpt-4o" dacă ai credit
      messages: [
        {
          role: "system",
          content: "You are an expert HR recruiter. Analyze the resume and return ONLY a JSON object with: score (0-100), summary, categories (experience, skills), strengths (array), improvements (array), actionItems (array), keywords (present, missing)."
        },
        {
          role: "user",
          content: `Analyze this resume content: ${content}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}