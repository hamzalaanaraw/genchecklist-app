
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, GenerationConfig } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured.' });
  }

  // --- NEW: Enforce JSON output from the model ---
  const genAI = new GoogleGenerativeAI(apiKey);
  const generationConfig: GenerationConfig = {
      responseMimeType: "application/json",
  };
  const model = genAI.getGenerativeModel({ 
      model: "gemini-pro", 
      generationConfig 
  });

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'A prompt is required.' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    // --- NEW: Add server-side validation ---
    try {
        // First, check if the response is valid JSON.
        JSON.parse(rawText); 
        // If it is, send it to the frontend.
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(rawText);
    } catch (parseError) {
        // If parsing fails, the AI's response was bad.
        console.error("AI response was not valid JSON:", rawText);
        throw new Error("The AI model returned an invalid format. Please try again.");
    }

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(500).json({ error: errorMessage });
  }
}
