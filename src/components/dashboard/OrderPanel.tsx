"use client";

import { useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function OrderPanel() {
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState<string>("100");
  const [leverage, setLeverage] = useState<string>("5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Executed ${orderType} Order: $${amount} at ${leverage}x Leverage`);
  };

  return (
    <div className="bg-slate-900 p-4 border border-gray-800 rounded-xl space-y-4">
      <h2 className="text-lg font-semibold text-white">Execute Trade</h2>

      {/* Buy/Sell Selector */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setOrderType("BUY")}
          className={`flex items-center justify-center gap-1 py-2 rounded-lg font-semibold text-sm transition-all ${
            orderType === "BUY" ? "bg-emerald-600 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"
          }`}
        >
          <ArrowUpRight size={16} /> Buy / Long
        </button>
        <button
          onClick={() => setOrderType("SELL")}
          className={`flex items-center justify-center gap-1 py-2 rounded-lg font-semibold text-sm transition-all ${
            orderType === "SELL" ? "bg-rose-600 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"
          }`}
        >
          <ArrowDownRight size={16} /> Sell / Short
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Order Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500"><DollarSign size={14} /></span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-gray-800 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="100"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Leverage ({leverage}x)</label>
          <input
            type="range"
            min="1"
            max="20"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all ${
            orderType === "BUY" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {orderType} BTC/USDT
        </button>
      </form>
    </div>
  );
}