import React from "react";
import { useCampaign } from "../../context/CampaignContext";

export default function TopBar() {
  const { results } = useCampaign();

  const totalScore = results
    ? Math.round(
        Object.values(results.results).reduce(
          (acc, r) => acc + (r.engagement?.total || 0),
          0
        ) / Object.keys(results.results).length
      )
    : 0;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800">
            PersonaPulse Studio
          </h1>
          <p className="text-xs text-slate-500">
            Bharat’s Omnichannel Campaign Engine
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm">
          <Metric label="Platforms" value={results ? Object.keys(results.results).length : 0} />
          <Metric label="Overall Score" value={`${totalScore}/100`} highlight />
          <Metric label="Est. Time Saved" value="4.5 Hours" />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div className="text-center">
      <div className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}