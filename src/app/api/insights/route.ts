import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Simulator pentru funcția de Insights / Statistici Piață
    return NextResponse.json({
      success: true,
      insights: {
        marketDemand: "Ridicată",
        topSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        salaryRange: "4000 - 6000 RON (Entry-Level)",
        recommendation: "Piața caută activ developeri cu proiecte practice în portofoliu. Continuă să-ți optimizezi CV-ul pentru tehnologiile moderne."
      }
    });
  } catch {
    return NextResponse.json({ success: true });
  }
}