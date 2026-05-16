import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Simulator pentru funcția de Coach
    return NextResponse.json({
      success: true,
      message: "Răspuns simulat de la Coach pentru modul Demo."
    });
  } catch {
    return NextResponse.json({ success: true });
  }
}