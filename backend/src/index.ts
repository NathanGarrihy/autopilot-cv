import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/tailor", async (req: Request, res: Response) => {
  const { cv, jobDescription } = req.body;

  if (!cv || !jobDescription) {
    return res
      .status(400)
      .json({ error: "CV and job description are required." });
  }

  try {
    const prompt = `
You are a career coach and CV writing expert.

Your task is to tailor the following candidate CV to match the job description provided.
Only rewrite the CV content. Do not include explanations or summaries. Keep formatting clear and ATS-friendly.

--- CANDIDATE CV ---
${cv}

--- JOB DESCRIPTION ---
${jobDescription}

--- TAILORED CV ---
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅ change this
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer optimizing CVs for specific jobs.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    });

    const tailoredCV =
      response.choices[0]?.message?.content || "No content generated.";
    return res.json({ tailoredCV });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: "Failed to generate tailored CV." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
