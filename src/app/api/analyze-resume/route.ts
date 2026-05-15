import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    // 1. Verificăm cheia chiar aici, în interior
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("EROARE: OPENAI_API_KEY nu este setată în mediu!");
      return NextResponse.json({ 
        success: false, 
        error: "Cheia API lipsește. Verifică setările Vercel!" 
      }, { status: 500 });
    }

    // 2. Inițializăm OpenAI abia acum
    const openai = new OpenAI({ apiKey });

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "Fișier lipsă" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const content = Buffer.from(bytes).toString('utf-8').replace(/[^\x20-\x7E\n]/g, '');

    // 3. Apelul către AI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Return ONLY a JSON object with resume analysis: score, summary, categories, strengths, improvements, actionItems, keywords."
        },
        {
          role: "user",
          content: `Analyze: ${content.slice(0, 3000)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json({ success: true, analysis });

  } catch (error: any) {
    console.error("DETALII EROARE SERVER:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Eroare la procesare" 
    }, { status: 500 });
  }
}