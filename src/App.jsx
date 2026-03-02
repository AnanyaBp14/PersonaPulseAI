import React from "react";
import { CampaignProvider } from "./context/CampaignContext";
import TopBar from "./components/layout/TopBar";
import SmartBuilder from "./components/builder/SmartBuilder";
import CampaignGrid from "./components/dashboard/CampaignGrid";

export default function App() {
  return (
    <CampaignProvider>
      <div className="min-h-screen bg-[#f5f6fa] text-slate-800">
        <TopBar />
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
          <SmartBuilder />
          <CampaignGrid />
        </div>
      </div>
    </CampaignProvider>
  );
}