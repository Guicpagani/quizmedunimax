import { NextResponse } from 'next/server';

// ATENÇÃO: Mudamos de POST para GET para este teste
export async function GET(req) {
  return NextResponse.json({ message: 'A rota GET no projeto recriado está funcionando!' });
}