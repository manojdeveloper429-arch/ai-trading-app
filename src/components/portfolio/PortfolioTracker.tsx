"use client";

import { useState, useEffect } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, CheckCircle, XCircle } from "lucide-react";

interface Position {
  id: string;
  asset: string;
  type: "LONG" | "SHORT";
  entryPrice: number;
  sizeUnits: number;
  stopLoss: number;
  takeProfit: number;
  timestamp: string;
}

export default function PortfolioTracker({ selectedAsset }: { selectedAsset: string }) {
  const [balance, setBalance] = useState<number>(10000);
  const [positions, setPositions] = useState<Position[]>([]);
  
  // Trade Form Inputs
  const [tradeType, setTradeType] = useState<"LONG" | "SHORT">("LONG");
  const [entryPrice, setEntryPrice] = useState("");
  const [sizeUnits, setSizeUnits] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");

  // Load portfolio state from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("paper_balance");
    const savedPositions = localStorage.getItem("paper_positions");
    if (savedBalance) setBalance(Number(savedBalance));
    if (savedPositions) {
      try { setPositions(JSON.parse(savedPositions)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveState = (newBalance: number, newPositions: Position[]) => {
    setBalance(newBalance);
    setPositions(newPositions);
    localStorage.setItem("paper_balance", newBalance.toString());
    localStorage.setItem("paper_positions", JSON.stringify(newPositions));
  };

  const openPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryPrice || !sizeUnits || !stopLoss || !takeProfit) return;

    const newPosition: Position = {
      id: Date.now().toString(),
      asset: selectedAsset,
      type: tradeType,
      entryPrice: Number(entryPrice),
      sizeUnits: Number(sizeUnits),
      stopLoss: Number(stopLoss),
      takeProfit: Number(takeProfit),
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedPositions = [newPosition, ...positions];
    saveState(balance, updatedPositions);

    // Reset inputs
    setEntryPrice("");
    setSizeUnits("");
    setStopLoss("");
    setTakeProfit("");
  };

  const closePosition = (id: string, exitPrice: number) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;

    let pnl = 0;
    if (pos.type === "LONG") {
      pnl = (exitPrice - pos.entryPrice) * pos.sizeUnits;
    } else {
      pnl = (pos.entryPrice - exitPrice) * pos.sizeUnits;
    }

    const newBalance = balance + pnl;
    const updatedPositions = positions.filter((p) => p.id !== id);
    saveState(newBalance, updatedPositions);
  };

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Wallet className="text-emerald-400" size={20} /> Virtual Paper Portfolio
        </h3>
        <div className="text-right">
          <span className="text-xs text-gray-400 block">Paper Equity</span>
          <span className="text-base font-bold text-emerald-400">${balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Paper Order Form */}
      <form onSubmit={openPosition} className="space-y-3 bg-slate-950 p-3.5 border border-slate-800 rounded-lg text-xs">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div>
            <label className="text-gray-400 block mb-1">Direction</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as "LONG" | "SHORT")}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white font-bold"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Entry Price ($)</label>
            <input
              type="number"
              placeholder="e.g. 67000"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Units (Size)</label>
            <input
              type="number"
              placeholder="e.g. 0.15"
              value={sizeUnits}
              onChange={(e) => setSizeUnits(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Stop Loss ($)</label>
            <input
              type="number"
              placeholder="e.g. 65800"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Take Profit ($)</label>
            <input
              type="number"
              placeholder="e.g. 70000"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition-all cursor-pointer"
        >
          Execute Paper Order
        </button>
      </form>

      {/* Active Positions Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Open Positions</h4>
        {positions.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No paper positions active.</p>
        ) : (
          positions.map((pos) => (
            <div key={pos.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex justify-between items-center text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{pos.asset}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${pos.type === "LONG" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                    {pos.type}
                  </span>
                  <span className="text-gray-500 text-[10px]">{pos.timestamp}</span>
                </div>
                <div className="text-gray-400 text-[11px] flex gap-3">
                  <span>Entry: ${pos.entryPrice}</span>
                  <span>Units: {pos.sizeUnits}</span>
                  <span>SL: ${pos.stopLoss}</span>
                  <span>TP: ${pos.takeProfit}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => closePosition(pos.id, pos.takeProfit)}
                  className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] hover:bg-emerald-500/30"
                >
                  Close @ TP
                </button>
                <button
                  onClick={() => closePosition(pos.id, pos.stopLoss)}
                  className="px-2 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[10px] hover:bg-rose-500/30"
                >
                  Close @ SL
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}