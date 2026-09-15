"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import MarketScanner from "@/components/scanner/MarketScanner";
import OrderPanel from "@/components/dashboard/OrderPanel";
import RiskCalculator from "@/components/risk/RiskCalculator";
import TradeAnalyzer from "@/components/analysis/TradeAnalyzer";
import TradeJournal from "@/components/journal/TradeJournal";
import AlertManager from "@/components/alerts/AlertManager";
import { Bot, ShieldCheck } from "lucide-react";

const CandleChart = dynamic(() => import("@/components/charts/CandleChart"), {
  ssr: false,
});

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState("BTC/USDT");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="text-emerald-400" /> AI Trading Copilot & Research Lab
          </h1>
          <p className="text-sm text-gray-400">Strict 7-stage research, risk arithmetic, and discipline workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold flex items-center gap-1">
            <ShieldCheck size={14} /> Active Ticker: {selectedAsset}
          </span>
        </div>
      </header>

      <MarketScanner onSelectAsset={setSelectedAsset} selectedAsset={selectedAsset} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl">
            <h2 className="text-lg font-semibold mb-3 text-white">{selectedAsset} Live Market Data</h2>
            <CandleChart />
          </div>
          <RiskCalculator />
          <TradeJournal />
        </div>

        <div className="space-y-6">
          <TradeAnalyzer />
          <AlertManager selectedAsset={selectedAsset} />
          <OrderPanel />
        </div>
      </div>
    </main>
  );
}