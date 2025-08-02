import { GoogleGenAI } from "@google/genai";
declare global {
  interface ImportMeta {
    env: {
      VITE_GEMINI_API_KEY: string;
    };
  }
}

// --- Gemini API Client Initialization ---
const API_KEY: string = (import.meta.env as { VITE_GEMINI_API_KEY: string }).VITE_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI. Check API key or library version.", error);
  }
} else {
  console.warn("Gemini API key not found in environment variables. AI features will be disabled.");
}

export const geminiService = {
  /**
   * Generates a product description using the Gemini AI model.
   * @param productTitle The title of the product to generate a description for.
   * @returns A promise that resolves to the generated description string.
   */
  generateDescription: async (productTitle: string): Promise<string> => {
    if (!ai) {
      const errorMessage = "AI description generation is unavailable. Please ensure the API key is configured.";
      console.error("Cannot generate description: Gemini AI service is not initialized.");
      return Promise.reject(new Error(errorMessage));
    }

    try {
      const prompt = `Generate a compelling and attractive product description for a listing on a barter and rental platform. The product is a "${productTitle}". The description should be concise (around 3-4 sentences), appealing, and highlight its potential for being bartered or rented. Do not use markdown or special formatting.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 1,
          topK: 32,
          maxOutputTokens: 150,
        },
      });

      // ✅ Ensure response.text is always a string
      return response.text ?? "No description could be generated.";
    } catch (error) {
      console.error("Error generating description with Gemini:", error);
      throw new Error("Failed to generate description. Please try again or write your own.");
    }
  },
};
