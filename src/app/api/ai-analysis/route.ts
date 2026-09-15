import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { asset, timeframe, userSetup, priceData } = await req.json();

    const prompt = `
      You are an adversarial trading research assistant. Your primary directive is to CRITIQUE and expose potential flaws, hidden risks, and invalidations in the user's setup. 
      Do NOT give financial advice. Do NOT validate their confirmation bias.

      User Trade Details:
      - Asset: ${asset}
      - Timeframe: ${timeframe}
      - Invalidation/Setup Hypothesis: ${userSetup}
      - Price Context: ${priceData}

      Respond strictly in JSON format with the following keys:
      {
        "trendAlignment": "Analysis of HTF vs LTF alignment.",
        "strongArgumentAgainst": "The single strongest counter-argument or flaw in this setup.",
        "uncheckedVariables": "Critical macroeconomic, volume, or structural factors not accounted for.",
        "setupValidity": "WEAK", "MODERATE", or "STRONG"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const resultText = response.choices[0].message.content;
    const analysis = JSON.parse(resultText || "{}");

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to complete AI analysis" },
      { status: 500 }
    );
  }
}