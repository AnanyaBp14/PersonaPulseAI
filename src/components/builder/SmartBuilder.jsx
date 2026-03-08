import React from "react";
import { useCampaign } from "../../context/CampaignContext";

export default function SmartBuilder() {
  const { formData, setFormData, submitCampaign } = useCampaign();

  const togglePlatform = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-6 space-y-6 transition-colors duration-300">
      
      {/* Title */}
      <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-400">
        Smart Campaign Builder
      </h2>

      {/* Campaign Idea */}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-gray-400 mb-2 block">
          Core Campaign Idea
        </label>
        <textarea
          value={formData.idea}
          onChange={(e) =>
            setFormData({ ...formData, idea: e.target.value })
          }
          placeholder="e.g., AI impact on EXIM..."
          className="w-full p-3 border border-slate-200 dark:border-gray-600 rounded-xl text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
          rows="3"
        />
      </div>

      {/* Platform Selector */}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-gray-400 mb-2 block">
          Target Platforms
        </label>
        <div className="flex gap-2 flex-wrap">
          {["LinkedIn", "Twitter", "Instagram", "WhatsApp"].map((p) => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`px-4 py-2 text-xs font-medium rounded-xl border transition-colors ${
                formData.platforms.includes(p)
                  ? "bg-orange-500 text-white border-orange-500 dark:bg-orange-600 dark:border-orange-600"
                  : "bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Layout for Audience & Tone */}
      <div className="grid grid-cols-2 gap-4">
        {/* Target Audience */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-gray-400 block mb-1">
            Audience
          </label>
          <select
            value={formData.audience}
            onChange={(e) =>
              setFormData({ ...formData, audience: e.target.value })
            }
            className="w-full p-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
          >
            <option>Professionals</option>
            <option>MSME Owners</option>
            <option>Startup Founders</option>
            <option>Logistics Partners</option>
            <option>Retail Buyers</option>
          </select>
        </div>

        {/* Brand Tone */}
        <div>
          <label className="text-xs font-medium text-slate-500 dark:text-gray-400 block mb-1">
            Tone
          </label>
          <select
            value={formData.tone}
            onChange={(e) =>
              setFormData({ ...formData, tone: e.target.value })
            }
            className="w-full p-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
          >
            <option>Professional</option>
            <option>Conversational</option>
            <option>Energetic</option>
            <option>Bold</option>
            <option>Urgent / FOMO</option>
          </select>
        </div>
      </div>

      {/* Language */}
      <div className="pt-2 border-t border-slate-100 dark:border-gray-700">
        <label className="text-xs font-bold text-orange-500 dark:text-orange-400 block mb-2">
          IN Bharat Localization
        </label>
        <select
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="w-full p-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
        >
          <option value="English">English</option>
          <option value="Hinglish">Hinglish</option>
          <option value="Hindi">Hindi</option>
          <option value="Kannada">Kannada</option>
          <option value="Marathi">Marathi</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={submitCampaign}
          className="w-full bg-orange-800/90 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-orange-50 dark:text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          Generate Campaign
        </button>
      </div>
    </div>
  );
}