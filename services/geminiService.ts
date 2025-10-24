
import { GoogleGenAI } from "@google/genai";
import { Card } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume the key is present.
  console.warn("API key not found. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getDeckStrategy(deck: Card[]): Promise<string> {
  if (!API_KEY) {
    return "Error: API key is not configured. Please set up your environment variables.";
  }
  
  if (deck.length === 0) {
    return "Your deck is empty. Add some cards to get a strategy!";
  }

  const cardNames = deck.map(card => card.name).join(', ');
  
  const prompt = `
    You are a world-class Clash Royale strategy expert. 
    Analyze the following deck and provide a concise, actionable strategy.
    The user is looking for advice to win games with this deck.

    Deck: ${cardNames}

    Please provide your analysis in the following format:
    
    **Overall Strategy:** 
    A brief paragraph on the main game plan (e.g., beatdown, cycle, control).

    **Strengths:** 
    A bulleted list of the deck's main advantages.

    **Weaknesses:** 
    A bulleted list of what this deck might struggle against.

    **Key Card Synergies:**
    A short description of 2-3 important card combinations in this deck.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate a strategy at this time. Please check the console for more details.";
  }
}
