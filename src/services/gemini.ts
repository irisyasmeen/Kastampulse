import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askCustomsAI(history: ChatMessage[], question: string) {
  try {
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
