"use client";

import CandleChart from "@/components/charts/CandleChart";
import { TrendingUp, TrendingDown, Bot, DollarSign, Activity } from "lucide-react";

export default function Home() {
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
          <p className="text-2xl font-bold text-emerald-400">STRONG BUY</p>
          <span className="text-xs text-gray-400">Confidence: 89%</span>
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart View */}
        <div className="lg:col-span-2 bg-slate-900 p-4 border border-gray-800 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">BTC/USD Live Chart</h2>
          <CandleChart />
        </div>

        {/* AI Recommendations Panel */}
        <div className="bg-slate-900 p-4 border border-gray-800 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bot size={20} className="text-emerald-400" /> AI Insights
          </h2>
          <div className="p-3 bg-slate-950 border border-gray-800 rounded-lg space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-emerald-400">BUY Entry Signal</span>
              <span className="text-xs text-gray-500">2 mins ago</span>
            </div>
            <p className="text-xs text-gray-300">RSI oversold on 15m timeframe. Moving averages crossing bullish.</p>
          </div>

          <div className="p-3 bg-slate-950 border border-gray-800 rounded-lg space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-rose-400">Stop Loss Target</span>
              <span className="text-xs text-gray-500">Auto-set</span>
            </div>
            <p className="text-xs text-gray-300">Risk boundary set at $66,200. Risk/Reward Ratio 1:3.</p>
          </div>
        </div>
      </div>
    </main>
  );
}