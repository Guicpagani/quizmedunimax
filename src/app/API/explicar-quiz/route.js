// Código de teste com GET
import { NextResponse } from 'next/server';

// ATENÇÃO: A função agora é GET, não POST.
export async function GET(req) {
  // Apenas retorna uma mensagem de sucesso.
  return NextResponse.json({ 
    message: 'Teste com o método GET funcionou!',
    timestamp: new Date().toISOString() 
  });
}