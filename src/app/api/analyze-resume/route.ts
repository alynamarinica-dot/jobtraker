import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    return NextResponse.json({
      success: true,
      analysis: {
        score: 85,
        summary: "CV-ul este bine structurat, dar mai poate fi îmbunătățit la secțiunea cuvinte cheie.",
        categories: {
          experience: { title: "Experiență", score: 90, feedback: "Foarte bună" },
          skills: { title: "Abilități", score: 80, feedback: "Adaugă mai multe tehnologii" }
        },
        strengths: ["Design curat", "Experiență relevantă"],
        improvements: ["Adaugă cifre la rezultate"],
        actionItems: ["Revizuiește introducerea"],
        keywords: { present: ["React", "Next.js"], missing: ["Tailwind", "TypeScript"] }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Eroare la analiză" }, { status: 500 });
  }
}