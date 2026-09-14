"use client";

import { useState } from "react";
import { ShieldAlert, AlertTriangle, Search, Bot } from "lucide-react";

interface AnalysisResult {
  trendAlignment: string;
  strongArgumentAgainst: string;
  uncheckedVariables: string;
  setupValidity: string;
}

export default function TradeAnalyzer() {
  const [asset, setAsset] = useState("BTC/USDT");
  const [timeframe, setTimeframe] = useState("4h");
  const [setupDesc, setSetupDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const runAdversarialAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset,
          timeframe,
          userSetup: setupDesc,
          priceData: "Live WebSocket feed verified",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bot className="text-amber-400" size={20} /> Stage 04: Adversarial AI Setup Analysis
        </h3>
        <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md font-medium">
          Challenge My Setup
        </span>
      </div>

      <form onSubmit={runAdversarialAnalysis} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Asset</label>
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Timeframe</label>
            <input
              type="text"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">Describe What You See (Your Hypothesis)</label>
          <textarea
            rows={3}
            value={setupDesc}
            onChange={(e) => setSetupDesc(e.target.value)}
            placeholder="e.g., Retesting daily support with RSI divergence on 1h chart..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !setupDesc}
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-white font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? "Analyzing Weaknesses..." : "Find the Flaws in My Trade"}
        </button>
      </form>

      {/* Adversarial Feedback Results */}
      {analysis && (
        <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-semibold text-slate-400">Validity Score</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              analysis.setupValidity === "WEAK" ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
            }`}>
              {analysis.setupValidity} SETUP
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-rose-400">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Strongest Argument Against Trade:</strong>
                <p className="text-slate-300">{analysis.strongArgumentAgainst}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-amber-400">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Trend Conflict:</strong>
                <p className="text-slate-300">{analysis.trendAlignment}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sky-400">
              <Search size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">What You Have Not Checked:</strong>
                <p className="text-slate-300">{analysis.uncheckedVariables}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}