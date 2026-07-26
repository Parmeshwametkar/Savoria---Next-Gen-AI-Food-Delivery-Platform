import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini lazily/safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// REST API ROUTES
// ----------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", name: "Savoria Next-Gen AI Food Platform", time: new Date().toISOString() });
});

// AI Recommendation Route
app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { prompt, dietaryPreference, budgetMax, mood, calorieLimit } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured recommendation if no API key set
      return res.json({
        summary: "Here are chef-curated selections tailored to your taste profile.",
        suggestedDishes: [
          {
            dishName: "Signature Wagyu Truffle Burger",
            restaurantName: "L’Atelier du Truffle & Steak",
            reason: "Rich, satisfying, high-protein indulgence crafted with A5 Miyazaki Wagyu and freshly shaved black truffle.",
            matchingCategory: "Artisanal Burgers",
            estimatedPrice: 24.99,
            healthTag: "High Protein",
          },
          {
            dishName: "Wild Salmon Avocado Glow Bowl",
            restaurantName: "Avocado & Green Organic Kitchen",
            reason: "Nutrient-packed wild Alaskan salmon with healthy omega-3 fatty acids, Hass avocado, and fresh quinoa.",
            matchingCategory: "Healthy & Nourish",
            estimatedPrice: 18.50,
            healthTag: "Keto & Clean",
          },
          {
            dishName: "Hyderabadi Zaffron Goat Dum Biryani",
            restaurantName: "Saffron & Spice House",
            reason: "Aromatic Basmati rice slow-infused with royal Kashmir saffron, tender spices, and claypot sealed flavor.",
            matchingCategory: "Royal Indian Craft",
            estimatedPrice: 23.50,
            healthTag: "Aromatic Comfort",
          },
        ],
        chefTip: "Pair rich truffle or steak dishes with a citrus cold-pressed tonic to heighten the umami flavor profile.",
      });
    }

    const systemInstruction = `You are Chef Savoria, a world-class Michelin-star culinary director and personal AI food concierge.
Your job is to analyze the user's cravings, dietary preferences, budget, mood, or fitness goals and generate tailored food recommendations from a luxury delivery platform.
Always output valid JSON following the specified schema.`;

    const userPromptText = `User Request: ${prompt || "Recommend something amazing to eat right now."}
Dietary Preference: ${dietaryPreference || "Any"}
Max Budget: ${budgetMax ? `$${budgetMax}` : "Flexible"}
Mood: ${mood || "Balanced"}
Calorie Limit: ${calorieLimit ? `${calorieLimit} kcal` : "No strict limit"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPromptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestedDishes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dishName: { type: Type.STRING },
                  restaurantName: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  matchingCategory: { type: Type.STRING },
                  estimatedPrice: { type: Type.NUMBER },
                  healthTag: { type: Type.STRING },
                },
                required: ["dishName", "restaurantName", "reason", "matchingCategory", "estimatedPrice", "healthTag"],
              },
            },
            chefTip: { type: Type.STRING },
          },
          required: ["summary", "suggestedDishes", "chefTip"],
        },
      },
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/ai/recommend:", error);
    res.status(500).json({
      error: "Failed to generate AI recommendations",
      details: error.message,
    });
  }
});

// AI Image Dish Recognition Route
app.post("/api/ai/vision-dish", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    const ai = getGeminiClient();

    if (!ai || !imageBase64) {
      return res.json({
        identifiedDish: "Gourmet Artisanal Burger",
        confidence: 0.95,
        description: "Looks like a juicy Wagyu or Angus beef patty burger served on toasted brioche with melting cheese.",
        matchingDishes: ["Signature Wagyu Truffle Burger", "Royal Dragon Flame Roll"],
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: "Identify this food dish from the image. Provide the dish name, short description, cuisine type, and 3 key ingredient highlights.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedDish: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            cuisineType: { type: Type.STRING },
            keyIngredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["identifiedDish", "confidence", "description", "cuisineType", "keyIngredients"],
        },
      },
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Error in /api/ai/vision-dish:", error);
    res.status(500).json({ error: "Failed to analyze food image", details: error.message });
  }
});

// ----------------------------------------------------
// VITE / STATIC SERVING
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Savoria Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
