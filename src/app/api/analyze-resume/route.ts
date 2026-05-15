import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const bytes = await file.arrayBuffer();
    const content = Buffer.from(bytes).toString('utf-8').toLowerCase();

    // Simulăm o întârziere de 1.5 secunde ca să pară că "gândește"
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extragem câteva cuvinte cheie din textul tău pentru a personaliza răspunsul
    const possibleKeywords = ['react', 'javascript', 'typescript', 'next.js', 'tailwind', 'python', 'java', 'sql', 'management', 'marketing'];
    const found = possibleKeywords.filter(kw => content.includes(kw));
    const missing = possibleKeywords.filter(kw => !content.includes(kw)).slice(0, 3);

    // Generăm un scor realist bazat pe câte cuvinte cheie am găsit
    const baseScore = 65;
    const dynamicScore = Math.min(95, baseScore + (found.length * 5));

    return NextResponse.json({
      success: true,
      analysis: {
        score: dynamicScore,
        summary: `Analiză finalizată pentru ${file.name}. Am identificat competențe în ${found.join(', ') || 'domeniul ales'}. Structura documentului este solidă.`,
        categories: {
          experience: { 
            title: "Experiență Profesională", 
            score: dynamicScore - 5, 
            feedback: "Rolurile sunt bine descrise, dar recomandăm folosirea metodei STAR pentru rezultate." 
          },
          skills: { 
            title: "Abilități Tehnice", 
            score: dynamicScore + 2, 
            feedback: `Excelentă prezența cuvintelor cheie precum: ${found.slice(0, 2).join(', ')}.` 
          }
        },
        strengths: [
          "Formatare profesională și lizibilă",
          found.length > 0 ? `Evidențierea corectă a stack-ului (${found[0]})` : "Secțiuni bine delimitate",
          "Obiective profesionale clar exprimate"
        ],
        improvements: [
          "Adăugarea unor cifre concrete (ex: am crescut vânzările cu 20%)",
          `Integrarea mai multor cuvinte cheie: ${missing.join(', ')}`,
          "Optimizarea lungimii paragrafelor"
        ],
        actionItems: [
          "Include un link către portofoliu sau GitHub",
          "Revizuiește descrierea ultimului job",
          "Verifică gramatica și punctuația"
        ],
        keywords: {
          present: found.length > 0 ? found : ["Document general"],
          missing: missing
        }
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Eroare la procesarea fișierului" }, { status: 500 });
  }
}