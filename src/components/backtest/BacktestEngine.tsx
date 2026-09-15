"use client";

import { useState } from "react";
import { History, Play, BarChart2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface BacktestResult {
  totalTrades: number;
  winRate: number;
  netPnL: number;
  profitFactor: number;
  maxDrawdown: number;
  disciplinedScore: number;
}

export default function BacktestEngine() {
  const [startingBalance, setStartingBalance] = useState("10000");
  const [riskPerTrade, setRiskPerTrade] = useState("1");
  const [rewardRatio, setRewardRatio] = useState("2");
  const [sampleSize, setSampleSize] = useState("50");
  const [winRateInput, setWinRateInput] = useState("55");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);

  const runBacktest = () => {
    setIsSimulating(true);

    setTimeout(() => {
      const balance = Number(startingBalance);
      const riskPct = Number(riskPerTrade) / 100;
      const targetWinRate = Number(winRateInput) / 100;
      const rr = Number(rewardRatio);
      const tradesCount = Number(sampleSize);

      let currentBalance = balance;
      let wins = 0;
      let totalGain = 0;
      let totalLoss = 0;
      let peakBalance = balance;
      let maxDD = 0;

      for (let i = 0; i < tradesCount; i++) {
        const isWin = Math.random() < targetWinRate;
        const riskAmount = currentBalance * riskPct;

        if (isWin) {
          wins++;
          const winAmount = riskAmount * rr;
          currentBalance += winAmount;
          totalGain += winAmount;
        } else {
          currentBalance -= riskAmount;
          totalLoss += riskAmount;
        }

        if (currentBalance > peakBalance) {
          peakBalance = currentBalance;
        }

        const drawdown = ((peakBalance - currentBalance) / peakBalance) * 100;
        if (drawdown > maxDD) {
          maxDD = drawdown;
        }
      }

      const calculatedWinRate = (wins / tradesCount) * 100;
      const profitFactor = totalLoss === 0 ? totalGain : totalGain / totalLoss;

      setResult({
        totalTrades: tradesCount,
        winRate: Number(calculatedWinRate.toFixed(1)),
        netPnL: Number((currentBalance - balance).toFixed(2)),
        profitFactor: Number(profitFactor.toFixed(2)),
        maxDrawdown: Number(maxDD.toFixed(1)),
        disciplinedScore: 100, // 100% adherence to rules during backtest
      });

      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <History className="text-purple-400" size={20} /> Historical Backtesting Engine
        </h3>
        <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">
          Rule Adherence Simulator
        </span>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs bg-slate-950 p-3.5 border border-slate-800 rounded-lg">
        <div>
          <label className="text-gray-400 block mb-1">Start Capital ($)</label>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 block mb-1">Risk / Trade (%)</label>
          <input
            type="number"
            value={riskPerTrade}
            onChange={(e) => setRiskPerTrade(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 block mb-1">Target R:R Ratio</label>
          <input
            type="number"
            value={rewardRatio}
            onChange={(e) => setRewardRatio(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 block mb-1">Hist. Win Rate (%)</label>
          <input
            type="number"
            value={winRateInput}
            onChange={(e) => setWinRateInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 block mb-1">Sample Trades</label>
          <input
            type="number"
            value={sampleSize}
            onChange={(e) => setSampleSize(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>
      </div>

      <button
        onClick={runBacktest}
        disabled={isSimulating}
        className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Play size={14} /> {isSimulating ? "Simulating Strategy..." : "Run Historical Simulation"}
      </button>

      {/* Results Matrix */}
      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 border border-slate-800 rounded-lg">
          <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span className="text-gray-400 block mb-0.5">Net PnL</span>
            <span className={`text-base font-bold ${result.netPnL >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {result.netPnL >= 0 ? `+$${result.netPnL.toLocaleString()}` : `-$${Math.abs(result.netPnL).toLocaleString()}`}
            </span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span className="text-gray-400 block mb-0.5">Simulated Win Rate</span>
            <span className="text-base font-bold text-white">{result.winRate}%</span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span className="text-gray-400 block mb-0.5">Profit Factor</span>
            <span className="text-base font-bold text-purple-400">{result.profitFactor}</span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span className="text-gray-400 block mb-0.5">Max Drawdown</span>
            <span className="text-base font-bold text-rose-400">{result.maxDrawdown}%</span>
          </div>
        </div>
      )}
    </div>
  );
}