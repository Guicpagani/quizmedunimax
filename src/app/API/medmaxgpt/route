// src/app/api/medmaxgpt/route.js
export async function POST(req) {
  const { question, answer } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY not found." }), { status: 500 });
  }

  const prompt = `Explique de forma objetiva e didática o seguinte tema para um estudante de medicina, considerando a pergunta e a alternativa correta:\n\nPergunta: ${question}\nResposta correta: ${answer}`;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 256,
        temperature: 0.5,
      }),
    });
    const data = await completion.json();

    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return new Response(JSON.stringify({ explanation: data.choices[0].message.content }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "No explanation found." }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch explanation." }), { status: 500 });
  }
}
