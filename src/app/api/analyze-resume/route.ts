import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileName = file ? file.name : "CV_Document.pdf";

    // Simulăm încărcarea timp de 1.5 secunde
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Scor demo stabil
    const dynamicScore = 88;

    return NextResponse.json({
      success: true,
      analysis: {
        score: dynamicScore,
        summary: `Analiză finalizată cu succes pentru "${fileName}". Structura generală este excelentă.`,
        categories: {
          experience: { title: "Experiență Profesională", score: 85, feedback: "Rolurile sunt bine structurate." },
          skills: { title: "Abilități Tehnice", score: 90, feedback: "Stack-ul tehnologic este vizibil și clar." }
        },
        strengths: ["Design curat și ierarhie vizuală", "Secțiunea de contact ușor de găsit"],
        improvements: ["Adăugarea unor cifre concrete", "Scurtarea paragrafelor prea lungi"],
        actionItems: ["Adaugă link către LinkedIn/GitHub", "Optimizează descrierea ultimului proiect"],
        keywords: {
          present: ["React", "JavaScript", "Git"],
          missing: ["TypeScript", "Next.js"]
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: true, analysis: { score: 85, summary: "Mod Demo activat." } });
  }
}