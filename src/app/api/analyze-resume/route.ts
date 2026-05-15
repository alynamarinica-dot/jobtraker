import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Mesaj de log pentru a vedea în consola Vercel că API-ul a fost apelat
    console.log("API Analyze Resume apelat cu succes");
    
    return NextResponse.json({
      success: true,
      analysis: {
        score: 85,
        summary: "Analiză reușită! Acesta este un răspuns de test pentru a verifica conexiunea.",
        categories: {
          experience: { title: "Experiență", score: 90, feedback: "Puncte forte identificate." },
          skills: { title: "Abilități", score: 80, feedback: "Continuă să adaugi proiecte." }
        },
        strengths: ["Structură profesională", "Claritate"],
        improvements: ["Mai multe cuvinte cheie specifice"],
        actionItems: ["Verifică secțiunea de contact"],
        keywords: { present: ["React", "Next.js"], missing: ["TypeScript"] }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}