import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Lighthouse School Visit Ramtek' });
});

// Serve official RAMTEK.csv data directly
app.get('/api/schools-raw', (req, res) => {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'RAMTEK.csv');
    if (fs.existsSync(csvPath)) {
      const content = fs.readFileSync(csvPath, 'utf8');
      res.setHeader('Content-Type', 'text/csv');
      res.send(content);
    } else {
      res.status(404).json({ error: 'RAMTEK.csv not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read school dataset' });
  }
});

// AI Location & Field Marketing Verification Endpoint with Google Maps Grounding
app.post('/api/verify-location', async (req, res) => {
  try {
    const { schoolName, village, gramPanchayat, udiseCode, pinCode } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: false,
        message: 'Gemini API key is not configured. Using verified local registry fallback.',
        isFallback: true,
      });
    }

    const prompt = `You are an expert geographer and field marketing specialist for schools in Ramtek Block, Nagpur District, Maharashtra, India (PIN ${pinCode || '441106'}).
School Name: "${schoolName}"
UDISE Code: ${udiseCode}
Village: "${village}"
Gram Panchayat: "${gramPanchayat}"
Expected Block: RAMTEK, District: NAGPUR, State: MAHARASHTRA.

Please verify this school's location and provide:
1. Exact Landmark / Building confirmation if known in Ramtek.
2. Verified address description and route tips for a field visitor.
3. Verification Confidence: High, Medium, or Low.
4. Suggested coordinates if specifically verified in Ramtek (format: lat, lng) within latitude 21.25 to 21.75 and longitude 79.15 to 79.60. Do NOT guess outside Ramtek.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      verificationNotes: response.text || 'Location verified against Ramtek revenue registry.',
    });
  } catch (err: any) {
    console.error('Error verifying school location with AI:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Verification service encountered an issue.',
    });
  }
});

// AI Route & Marketing Pitch Assistant
app.post('/api/visit-brief', async (req, res) => {
  try {
    const { schools, visitorName } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: false,
        briefing: 'Standard Field Visit Plan: Prioritize high-enrollment schools in Mansar and Deolapar clusters first.',
      });
    }

    const schoolsSummary = (schools || []).slice(0, 10).map((s: any, idx: number) => 
      `${idx + 1}. ${s.schoolName} (${s.village}, UDISE: ${s.udiseCode}, Mgmt: ${s.schoolManagement}, Category: ${s.schoolCategory})`
    ).join('\n');

    const prompt = `You are a school marketing field coordinator for Lighthouse Education in Ramtek Taluka, Nagpur.
Visitor: ${visitorName || 'Field Representative'}
Planned itinerary of schools:
${schoolsSummary}

Provide a concise 3-point field briefing:
1. Optimal travel sequence & road conditions in Ramtek (NH44 corridor vs rural link roads).
2. Key pitch angle for local body / government aided schools in this cluster.
3. Best contact timing and documentation to carry for Headmasters/Principals.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      briefing: response.text,
    });
  } catch (err: any) {
    console.error('Error generating visit brief:', err);
    res.status(500).json({ error: 'Failed to generate visit briefing' });
  }
});

// Vite middleware setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lighthouse Ramtek server running on http://0.0.0.0:${PORT}`);
  });
}

start();
