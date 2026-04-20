import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAIInstance() {
  if (!aiInstance) {
    // Safely check for GEMINI_API_KEY without relying on global process object existence
    let apiKey: string | undefined;
    try {
      apiKey = process.env.GEMINI_API_KEY;
    } catch (e) {
      // process.env might be completely missing in some browser environments
      console.warn("process.env is not available in this environment.");
    }

    if (!apiKey || apiKey === "undefined" || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is missing or using placeholder. AI features will be limited.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function askCustomsAI(history: ChatMessage[], question: string) {
  try {
    const ai = getAIInstance();
    if (!ai) {
      return "I'm sorry, I'm currently unable to access the Customs AI advisor. Please contact your system administrator or check the manual procedures.";
    }

    const systemInstruction = `
      You are an expert Malaysia Customs Assistant.
      You help Customs officers with information about HS codes, Customs Act 1967, import/export procedures, and excise duties.
      
      CORE OPERATIONAL KNOWLEDGE:
      - Nowadays, all physical examination or checking of cargo/goods at borders is handled by AKPS (Malaysia Border Control and Protection Agency). 
      - JKDM (Jabatan Kastam Diraja Malaysia) remains responsible for tax collection, commodity classification (HS Codes), and valuation.
      - If an officer asks about physical inspection, remind them that this is now the responsibility of AKPS.
      
      Always be professional, accurate, and cite parts of the Customs Act if possible.
      If you are unsure, advise the officer to consult the Senior Assistant Director of Customs.
      Keep your answers concise and scannable.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role as any, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again or check the manual procedures.";
  }
}
