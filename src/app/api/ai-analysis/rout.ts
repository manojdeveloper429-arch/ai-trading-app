import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { asset, timeframe, userSetup, priceData } = await req.json();

    const systemPrompt = `
      You are an adversarial trading research assistant. Your task is to critique and find flaws in the user's trading setup.
      Do NOT validate their emotions. Do NOT encourage them. Do NOT predict prices or guarantee results.
      
      Review the trade:
      Asset: ${asset}
      Timeframe: ${timeframe}
      User's Hypothesis: ${userSetup}
      Provided Data: ${priceData}

      Output JSON with:
      1. trendAlignment (Is timeframe aligned with higher timeframe?)
      2. strongArgumentAgainst (The single best argument for why this trade fails)
      3. uncheckedVariables (What critical information is missing?)
      4. setupValidity (WEAK, MODERATE, or STRONG based strictly on facts)
    `;

    // Internal mock structure matching strict output rules
    return NextResponse.json({
      success: true,
      analysis: {
        trendAlignment: "Conflict: 15m is bullish, but 4h trend is strongly bearish.",
        strongArgumentAgainst: "Volume is declining as price approaches resistance, suggesting a low-conviction fakeout.",
        uncheckedVariables: "Upcoming macroeconomic rate decision in 2 hours.",
        setupValidity: "WEAK",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed analysis" }, { status: 500 });
  }
}