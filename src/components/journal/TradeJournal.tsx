"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, XCircle, Award, AlertCircle } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  asset: string;
  bias: "LONG" | "SHORT";
  followedPlan: boolean;
  result: "WIN" | "LOSS";
  pnl: number;
  reflection: string;
  processRating: "GOOD_PROCESS" | "RECKLESS";
}

export default function TradeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2026-03-10",
      asset: "BTC/USDT",
      bias: "LONG",
      followedPlan: true,
      result: "LOSS",
      pnl: -100,
      reflection: "Execution matched the invalidation plan. Clean exit at stop loss, no emotions involved.",
      processRating: "GOOD_PROCESS",
    },
    {
      id: "2",
      date: "2026-03-12",
      asset: "ETH/USDT",
      bias: "SHORT",
      followedPlan: false,
      result: "WIN",
      pnl: 250,
      reflection: "Moved stop loss further away when trade went against me. Got lucky on a dump.",
      processRating: "RECKLESS",
    },
  ]);

  const [asset, setAsset] = useState("BTC/USDT");
  const [bias, setBias] = useState<"LONG" | "SHORT">("LONG");
  const [followedPlan, setFollowedPlan] = useState(true);
  const [result, setResult] = useState<"WIN" | "LOSS">("WIN");
  const [pnl, setPnl] = useState("");
  const [reflection, setReflection] = useState("");

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection || !pnl) return;

    // Rule: Winning by breaking risk rules is still classified as RECKLESS
    const processRating = followedPlan ? "GOOD_PROCESS" : "RECKLESS";

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      asset,
      bias,
      followedPlan,
      result,
      pnl: Number(pnl),
      reflection,
      processRating,
    };

    setEntries([newEntry, ...entries]);
    setReflection("");
    setPnl("");
  };

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <BookOpen className="text-sky-400" size={20} /> Stage 07: Trade Reflection & Journal
        </h3>
        <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded-md font-medium">
          Process Over Outcome
        </span>
      </div>

      {/* Entry Form */}
      <form onSubmit={handleAddEntry} className="space-y-4 bg-slate-950 p-4 border border-slate-800 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-gray-400 block mb-1">Asset</label>
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Bias</label>
            <select
              value={bias}
              onChange={(e) => setBias(e.target.value as "LONG" | "SHORT")}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Outcome</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as "WIN" | "LOSS")}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            >
              <option value="WIN">WIN</option>
              <option value="LOSS">LOSS</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Net PnL ($)</label>
            <input
              type="number"
              placeholder="e.g. 150 or -50"
              value={pnl}
              onChange={(e) => setPnl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="text-gray-400">Did you strictly follow your written plan?</label>
          <button
            type="button"
            onClick={() => setFollowedPlan(!followedPlan)}
            className={`px-3 py-1 rounded text-xs font-semibold ${
              followedPlan ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
            }`}
          >
            {followedPlan ? "YES (Disciplined)" : "NO (Deviated)"}
          </button>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">What Worked / What Failed / One Change for Next Time</label>
          <textarea
            rows={2}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Be honest. Did you revenge trade? Did you respect your stop?"
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded text-xs transition-all cursor-pointer"
        >
          Log Journal Entry & Evaluate Process
        </button>
      </form>

      {/* Journal Table / History */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Past Trade Reviews</h4>
        <div className="space-y-2">
          {entries.map((item) => (
            <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col md:flex-row justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.asset}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.bias === "LONG" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                    {item.bias}
                  </span>
                  <span className="text-gray-500 text-[10px]">{item.date}</span>
                </div>
                <p className="text-gray-300">{item.reflection}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`font-bold ${item.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                </span>
                {item.processRating === "GOOD_PROCESS" ? (
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[11px]">
                    <Award size={14} /> Good Execution
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded text-[11px]">
                    <AlertCircle size={14} /> Reckless Decision
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}