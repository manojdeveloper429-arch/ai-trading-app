"use client";

import { useState } from "react";
import { Filter, TrendingUp, TrendingDown, Eye } from "lucide-react";

interface Ticker {
  symbol: string;
  price: string;
  change24h: number;
  trend: "BULLISH" | "BEARISH" | "NEUTRAL";
  volume: string;
}

interface MarketScannerProps {
  onSelectAsset: (symbol: string) => void;
  selectedAsset: string;
}

const MOCK_TICKERS: Ticker[] = [
  { symbol: "BTC/USDT", price: "67,420.00", change24h: 2.4, trend: "BULLISH", volume: "2.4B" },
  { symbol: "ETH/USDT", price: "3,540.50", change24h: -1.2, trend: "BEARISH", volume: "1.1B" },
  { symbol: "SOL/USDT", price: "148.20", change24h: 5.8, trend: "BULLISH", volume: "850M" },
  { symbol: "BNB/USDT", price: "580.10", change24h: 0.1, trend: "NEUTRAL", volume: "320M" },
];

export default function MarketScanner({ onSelectAsset, selectedAsset }: MarketScannerProps) {
  const [filter, setFilter] = useState<"ALL" | "BULLISH" | "BEARISH">("ALL");

  const filteredTickers = MOCK_TICKERS.filter((t) => {
    if (filter === "ALL") return true;
    return t.trend === filter;
  });

  return (
    <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Filter className="text-emerald-400" size={16} /> Stage 02: Scanner & Watchlist
        </h3>
        <div className="flex gap-1 text-[11px]">
          {(["ALL", "BULLISH", "BEARISH"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded ${
                filter === f
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {filteredTickers.map((ticker) => {
          const isSelected = selectedAsset === ticker.symbol;
          return (
            <div
              key={ticker.symbol}
              onClick={() => onSelectAsset(ticker.symbol)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? "bg-slate-800 border-emerald-500/50 text-white"
                  : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold flex items-center gap-1">
                  {ticker.symbol} {isSelected && <Eye size={12} className="text-emerald-400" />}
                </span>
                <span className={`text-[10px] flex items-center ${ticker.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {ticker.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {ticker.change24h}%
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>${ticker.price}</span>
                <span>Vol: {ticker.volume}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}