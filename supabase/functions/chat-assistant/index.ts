import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: { method: string; json: () => PromiseLike<{ messages: any; }> | { messages: any; }; }) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const systemPrompt = `Você é o assistente virtual da RePlant, uma plataforma de reciclagem focada EXCLUSIVAMENTE em PLÁSTICOS.

IMPORTANTE: A RePlant só aceita plásticos. Não aceitamos papel, vidro, metal, eletrônicos ou outros materiais.

## Plásticos que ACEITAMOS:
- Garrafas PET (refrigerantes, água, sucos)
- Embalagens de produtos de limpeza (bem lavadas)
- Potes de alimentos plásticos (margarina, iogurte, sorvete)
- Sacolas plásticas
- Tampas plásticas
- Embalagens de shampoo e condicionador
- Galões de água e óleo
- Tubos de creme dental (vazios e limpos)
- Copos descartáveis

## Plásticos que NÃO aceitamos:
- Isopor (EPS)
- Plástico metalizado (embalagens de salgadinhos)
- Canudos plásticos
- Fraldas descartáveis
- Plástico filme (aquele que gruda)
- Embalagens muito sujas com resíduos de comida

## Dicas importantes:
- Sempre lave as embalagens antes de descartar
- Remova tampas e rótulos quando possível
- Amasse as garrafas para ocupar menos espaço
- Separe por tipo quando possível

Seja simpático, use emojis e responda em português do Brasil. Se perguntarem sobre outros materiais (papel, vidro, metal), explique educadamente que a RePlant foca apenas em plásticos e sugira procurar cooperativas locais para outros materiais.

Contato: replant.oficial@gmail.com`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Aguarde um momento e tente novamente." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos esgotados. Entre em contato com o suporte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao processar sua mensagem." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua pergunta.";

    console.log("AI response received successfully");

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
