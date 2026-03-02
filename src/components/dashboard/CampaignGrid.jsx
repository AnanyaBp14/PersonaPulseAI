import React from "react";
import { useCampaign } from "../../context/CampaignContext";
import PlatformCard from "../cards/PlatformCard";

export default function CampaignGrid() {
  const { results, loading } = useCampaign();

  if (loading)
    return (
      <div className="text-center py-20 text-slate-400">
        Generating campaign...
      </div>
    );

  if (!results) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {Object.entries(results.results).map(([platform, data]) => (
        <PlatformCard key={platform} platform={platform} data={data} />
      ))}
    </div>
  );
}