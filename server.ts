import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Server-side GoogleGenAI initialization with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

// Multi-turn chat endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      messages = [],
      model = 'gemini-3.5-flash',
      systemInstruction = '',
      currentContext = null,
    } = req.body;

    // Validate model selection according to instructions
    // gemini-3.1-pro-preview (complex tasks)
    // gemini-3.5-flash (general tasks)
    // gemini-3.1-flash-lite (fast tasks)
    let selectedModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-pro-preview' || model === 'gemini-3.1-flash-lite' || model === 'gemini-3.5-flash') {
      selectedModel = model;
    }

    // Default rich apothecary nutrition role instruction
    let systemPrompt = systemInstruction || `You are Dr. Vance, the Master Apothecary & Clinical Nutritionist for the Apothecary Health Gauge app.
Your role:
- You advise Clara Vance with deep empathy, clinical rigor, and tactile apothecary wisdom.
- You speak in an elegant, authoritative yet warm tone, treating nutritional metrics (caloric heat, crude protein, lipids, complex carbs, and hydration) with scientific mindfulness.
- You understand Clara's current profile:
  - Daily Calorie Quota: 2,100 kcal
  - Hydration Goal: 2,500 ml
  - Today's date: October 24
- If the user provides contextual health state or asks about their meals, provide specific, practical advice. Keep answers helpful, well-structured, and concise without robotic AI jargon.`;

    if (currentContext) {
      systemPrompt += `\n\nCURRENT REAL-TIME CONTEXT OF TODAY'S FOLIO:
- Calories logged so far: ${currentContext.calories} kcal of 2,100 kcal goal (${currentContext.caloriesLeft} kcal remaining)
- Protein: ${currentContext.protein}g / 120g target
- Carbohydrates: ${currentContext.carbs}g / 210g target
- Essential Lipids/Fats: ${currentContext.fats}g / 65g target
- Hydration Reservoir: ${currentContext.water} ml of 2,500 ml target
- Recorded Meals: ${currentContext.mealNames?.join(', ') || 'None yet'}`;
    }

    // Format contents array for multi-turn chat
    const formattedContents = messages.map((m: ChatMessage) => ({
      role: m.role,
      parts: m.parts,
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "The apothecary ledger has processed your entry.";

    res.json({
      success: true,
      model: selectedModel,
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to consult Apothecary Intelligence.',
    });
  }
});

// Vite middleware mounting in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Apothecary Server] Running on http://0.0.0.0:${port}`);
  });
}

startServer();
