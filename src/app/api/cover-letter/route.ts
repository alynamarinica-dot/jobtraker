import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Simulator pentru Scrisoarea de Intenție (Cover Letter)
    return NextResponse.json({
      success: true,
      coverLetter: "Stimate Angajator,\n\nPrin prezenta îmi exprim interesul deosebit pentru poziția deschisă în cadrul companiei dumneavoastră. Cu o experiență solidă în dezvoltare web și competențe în tehnologii moderne, consider că mă aliniez perfect cerințelor rolului...\n\nCu stimă,\nCandidat Web Developer"
    });
  } catch {
    return NextResponse.json({ success: true });
  }
}