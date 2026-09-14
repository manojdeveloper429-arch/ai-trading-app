"use client";

import { useState } from "react";
import { ShieldAlert, Calculator } from "lucide-react";

export default function RiskCalculator() {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [maxRiskPercent, setMaxRiskPercent] = useState<number>(1); // Default 1%
  const [entryPrice, setEntryPrice] = useState<number>(67000);
  const [stopLoss, setStopLoss] = useState<number>(65800);
  const [targetPrice, setTargetPrice] = useState<number>(70600);

  // Arithmetic calculations
  const dollarRisk = (accountBalance * maxRiskPercent) / 100;
  const priceDistanceToStop = Math.abs(entryPrice - stopLoss);
  const positionUnits = priceDistanceToStop > 0 ? dollarRisk / priceDistanceToStop : 0;
  const totalPositionSizeUSD = positionUnits * entryPrice;
  
  const potentialReward = Math.abs(targetPrice - entryPrice) * positionUnits;
  const riskRewardRatio = dollarRisk > 0 ? (potentialReward / dollarRisk).toFixed(2) : "0";

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calculator className="text-emerald-400" size={20} /> Stage 05: Risk & Position Calculator
        </h3>
        <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md">Arithmetic First</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div>
          <label className="text-gray-400 text-xs block mb-1">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Max Risk (%)</label>
          <input
            type="number"
            value={maxRiskPercent}
            onChange={(e) => setMaxRiskPercent(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Entry Price ($)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Stop Loss ($)</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
          />
        </div>
      </div>

      {/* Output Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Max Dollar Risk</span>
          <p className="text-lg font-bold text-rose-400">${dollarRisk.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Allowed Position Size</span>
          <p className="text-lg font-bold text-emerald-400">{positionUnits.toFixed(4)} Units (${totalPositionSizeUSD.toFixed(2)})</p>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Risk : Reward Ratio</span>
          <p className={`text-lg font-bold ${Number(riskRewardRatio) >= 2 ? "text-emerald-400" : "text-amber-400"}`}>
            1 : {riskRewardRatio}
          </p>
        </div>
      </div>

      {Number(riskRewardRatio) < 2 && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs">
          <ShieldAlert size={16} />
          <span>Warning: Risk/Reward ratio is under 1:2. The framework suggests skipping trades with poor yield potential.</span>
        </div>
      )}
    </div>
  );
}