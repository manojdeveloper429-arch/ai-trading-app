import { NextResponse } from "next/server";

export async function GET() {
  // Simple RSI calculation mock logic for demo AI signals
  const signals = [
    {
      id: "1",
      symbol: "BTCUSDT",
      type: "BUY",
      confidence: 88,
      reason: "RSI oversold on 15m timeframe + Bullish EMA Crossover",
      targetPrice: 68500,
      stopLoss: 66200,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      symbol: "ETHUSDT",
      type: "HOLD",
      confidence: 62,
      reason: "Consolidating near major resistance zone",
      targetPrice: 3800,
      stopLoss: 3400,
      timestamp: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ success: true, data: signals });
}