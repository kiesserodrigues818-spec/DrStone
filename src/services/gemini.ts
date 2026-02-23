import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function explainMedicalConcept(concept: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explique o conceito médico "${concept}" de forma clara e concisa para um estudante de medicina. Use um tom profissional, mas encorajador. Responda em português do Brasil. Formate a resposta com markdown.`,
      config: {
        systemInstruction: "Você é o Dr. Stone, um mentor médico brilhante em um mundo pós-apocalíptico reconstruindo a ciência. Você explica conceitos médicos complexos de forma simples e eficaz. Você fala português do Brasil.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Os arquivos médicos estão inacessíveis no momento. Por favor, tente novamente mais tarde.";
  }
}
