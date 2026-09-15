"use client";

import { useState } from "react";
import { BellRing, ShieldAlert, Trash2, Send } from "lucide-react";

interface PriceAlert {
  id: string;
  asset: string;
  targetPrice: number;
  condition: "ABOVE" | "BELOW";
  webhookUrl?: string;
  active: boolean;
}

export default function AlertManager({ selectedAsset }: { selectedAsset: string }) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      asset: "BTC/USDT",
      targetPrice: 68500,
      condition: "ABOVE",
      webhookUrl: "",
      active: true,
    },
  ]);

  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState<"ABOVE" | "BELOW">("ABOVE");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice) return;

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      asset: selectedAsset,
      targetPrice: Number(targetPrice),
      condition,
      webhookUrl,
      active: true,
    };

    setAlerts([newAlert, ...alerts]);
    setTargetPrice("");
    setWebhookUrl("");
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-slate-900 p-5 border border-slate-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <BellRing className="text-indigo-400" size={20} /> Stage 02: Non-Executing Visual Alerts
        </h3>
        <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-md font-medium">
          Signal Notifier
        </span>
      </div>

      {/* Alert Form */}
      <form onSubmit={handleAddAlert} className="space-y-3 bg-slate-950 p-3.5 border border-slate-800 rounded-lg text-xs">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-gray-400 block mb-1">Asset</label>
            <input
              type="text"
              disabled
              value={selectedAsset}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-400 font-bold"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as "ABOVE" | "BELOW")}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            >
              <option value="ABOVE">Price ≥ Target</option>
              <option value="BELOW">Price ≤ Target</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Target Price ($)</label>
            <input
              type="number"
              placeholder="e.g. 68500"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 block mb-1">Webhook URL (Discord/Telegram Optional)</label>
          <input
            type="url"
            placeholder="https://discord.com/api/webhooks/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send size={14} /> Set Price Alert
        </button>
      </form>

      {/* Active Alerts List */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Watchers</h4>
        {alerts.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No alerts currently active.</p>
        ) : (
          alerts.map((item) => (
            <div key={item.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{item.asset}</span>
                <span className="text-indigo-400 font-mono">
                  {item.condition} ${item.targetPrice.toLocaleString()}
                </span>
                {item.webhookUrl && (
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                    Webhook Armed
                  </span>
                )}
              </div>
              <button
                onClick={() => removeAlert(item.id)}
                className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400">
        <ShieldAlert size={14} className="text-indigo-400 shrink-0" />
        <span>Alerts send real-time notifications to prevent missed invalidation levels without placing rogue automated trades.</span>
      </div>
    </div>
  );
}