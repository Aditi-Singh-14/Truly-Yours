import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * Helper to call Gemini / Gemma REST API
 */
async function callGemmaAPI(promptText: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }

  // Model cascade: try Gemma models first, then standard Gemini flash models
  const modelsToTry = [
    "gemma-4-4b-it",
    "gemma-4-27b-it",
    "gemma-2-27b-it",
    "gemini-3.6-flash",
  ];

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "aistudio-build",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        console.warn(`Model ${model} returned status ${response.status}: ${errBody}`);
        lastError = new Error(`API response error (${response.status}): ${errBody}`);
        continue;
      }

      const data = await response.json();
      const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textOutput) {
        return textOutput.trim();
      } else {
        lastError = new Error(`Model ${model} returned empty content parts.`);
      }
    } catch (err: any) {
      console.warn(`Failed calling model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Unable to generate text with available Gemma/Gemini models.");
}

// Endpoint 1: /extract-voice (also mounted at /api/extract-voice)
const extractVoiceHandler = async (req: express.Request, res: express.Response) => {
  try {
    const writingSample = req.body.text || req.body.sample || req.body.writingSample;

    if (!writingSample || typeof writingSample !== "string" || writingSample.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a valid writing sample (100-300 words recommended)." });
    }

    const prompt = `Analyze this writing sample and output a structured voice profile: sentence length tendency, vocabulary tier (casual/formal/technical), tone, 3-5 recurring words or phrases, overall rhythm. Format as labeled plain text.\n\nWriting sample:\n${writingSample.trim()}`;

    const profileText = await callGemmaAPI(prompt);
    return res.json({ profile: profileText, text: profileText });
  } catch (error: any) {
    console.error("Error in /extract-voice:", error);
    return res.status(500).json({ error: error.message || "Failed to extract voice profile." });
  }
};

app.post("/extract-voice", extractVoiceHandler);
app.post("/api/extract-voice", extractVoiceHandler);

// Endpoint 2: /generate (also mounted at /api/generate)
const generateHandler = async (req: express.Request, res: express.Response) => {
  try {
    const { profile, topic } = req.body;

    if (!profile || typeof profile !== "string" || profile.trim().length === 0) {
      return res.status(400).json({ error: "Voice profile text is required." });
    }

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const prompt = `Using this voice profile:\n${profile.trim()}\n\nWrite a short piece about: ${topic.trim()}. Match the tone, vocabulary, and rhythm described in the profile exactly.`;

    const generatedResult = await callGemmaAPI(prompt);
    return res.json({ generatedText: generatedResult, result: generatedResult });
  } catch (error: any) {
    console.error("Error in /generate:", error);
    return res.status(500).json({ error: error.message || "Failed to generate text." });
  }
};

app.post("/generate", generateHandler);
app.post("/api/generate", generateHandler);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Truly Yours Express Backend", time: new Date().toISOString() });
});

// Start API Server
function startServer() {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Truly Yours] Express API backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
