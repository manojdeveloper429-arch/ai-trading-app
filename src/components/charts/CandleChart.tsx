"use client";

import { useState } from "react";
import CandleChart from "@/components/charts/CandleChart";
import OrderPanel from "@/components/dashboard/OrderPanel";
import { TrendingUp, Bot, DollarSign, Activity, RefreshCw } from "lucide-react";

export default function Home() {
  const [aiAnalysis, setAiAnalysis] = useState({
    signal: "BUY",
    confidence: 89,
    reason: "RSI oversold on 15m timeframe. Moving averages crossing bullish.",
  });
  const [loading, setLoading] = useState(false);

  const generateNewAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: 67250,
          indicator: "RSI 28 + MACD Bullish Crossover",
          asset: "BTC/USDT",
        }),
      });
      const data = await res.json();
      if (data) {
        setAiAnalysis({
          signal: data.signal,
          confidence: data.confidence,
          reason: data.analysis,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Top Bar */}
      <header className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="text-emerald-400" /> AI Trading Dashboard
          </h1>
          <p className="text-sm text-gray-400">Real-time market analysis and automated signal execution</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
            ● AI Bot Active
          </span>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-gray-800 rounded-xl space-y-2">
          <span className="text-gray-400 text-sm flex items-center gap-2"><DollarSign size={16}/> Total Portfolio</span>
          <p className="text-2xl font-bold">$24,500.00</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp size={14}/> +12.4% this month</span>
        </div>
        <div className="p-4 bg-slate-900 border border-gray-800 rounded-xl space-y-2">
          <span className="text-gray-400 text-sm flex items-center gap-2"><Activity size={16}/> Active Signal</span>
          <p className={`text-2xl font-bold ${aiAnalysis.signal === "BUY" ? "text-emerald-400" : "text-rose-400"}`}>
            {aiAnalysis.signal}
          </p>
          <span className="text-xs text-gray-400">Confidence: {aiAnalysis.confidence}%</span>
        </div>
        <div className="p-4 bg-slate-900 border border-gray-800 rounded-xl space-y-2">
          <span className="text-gray-400 text-sm">Win Rate</span>
          <p className="text-2xl font-bold">74.2%</p>
          <span className="text-xs text-gray-400">Last 50 trades</span>
        </div>
        <div className="p-4 bg-slate-900 border border-gray-800 rounded-xl space-y-2">
          <span className="text-gray-400 text-sm">Total Profit</span>
          <p className="text-2xl font-bold text-emerald-400">+$3,210.50</p>
          <span className="text-xs text-gray-400">Risk Limit: 2% / trade</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-4 border border-gray-800 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">BTC/USD Live Chart</h2>
          <CandleChart />
        </div>

        <div className="space-y-6">
          <OrderPanel />

          <div className="bg-slate-900 p-4 border border-gray-800 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bot size={20} className="text-emerald-400" /> AI Market Analysis
              </h2>
              <button
                onClick={generateNewAnalysis}
                disabled={loading}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition-all"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-gray-800 rounded-lg space-y-1">
              <p className="text-xs text-gray-300">{aiAnalysis.reason}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}