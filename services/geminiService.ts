
import { GoogleGenAI } from "@google/genai";

// --- Gemini API Client Initialization ---

// The API key MUST be obtained from the environment variable `process.env.API_KEY`.
// It is assumed to be pre-configured and valid in the execution environment where this service is run.
// The application MUST NOT prompt the user for the key.
const API_KEY = process.env.API_KEY;

// Initialize the GoogleGenAI client.
// If the API_KEY is not available, `ai` will be null, and AI features will be gracefully disabled.
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
   * @rejects An error with a user-friendly message if generation fails.
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
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 1,
          topK: 32,
          maxOutputTokens: 150,
        },
      });

      // Directly return the text from the response.
      return response.text;
    } catch (error) {
      console.error("Error generating description with Gemini:", error);
      // Reject with a user-friendly error message.
      throw new Error("Failed to generate description. Please try again or write your own.");
    }
  },
};
