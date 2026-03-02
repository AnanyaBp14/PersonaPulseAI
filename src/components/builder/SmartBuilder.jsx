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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 className="text-sm font-semibold text-orange-600">
        Smart Campaign Builder
      </h2>

      {/* Campaign Idea */}
      <div>
        <label className="text-xs text-slate-500">
          Campaign Idea / Core Message
        </label>
        <textarea
          value={formData.idea}
          onChange={(e) =>
            setFormData({ ...formData, idea: e.target.value })
          }
          className="w-full mt-2 p-3 border rounded-xl text-sm"
          rows="3"
        />
      </div>

      {/* Platform Selector */}
      <div className="flex gap-2 flex-wrap">
        {["LinkedIn", "Instagram", "WhatsApp", "Twitter"].map((p) => (
          <button
            key={p}
            onClick={() => togglePlatform(p)}
            className={`px-4 py-1.5 text-xs rounded-full border ${
              formData.platforms.includes(p)
                ? "bg-orange-500 text-white border-orange-500"
                : "border-slate-300 text-slate-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Target Audience */}
      <div>
        <label className="text-xs text-slate-500 block mb-1">
          Target Audience
        </label>
        <select
          value={formData.audience}
          onChange={(e) =>
            setFormData({ ...formData, audience: e.target.value })
          }
          className="w-full p-2 border rounded-lg text-sm"
        >
          <option>Young Professionals</option>
          <option>MSME Owners</option>
          <option>Startup Founders</option>
          <option>Logistics Partners</option>
          <option>Retail Buyers</option>
        </select>
      </div>

      {/* Brand Tone */}
      <div>
        <label className="text-xs text-slate-500 block mb-1">
          Brand Tone
        </label>
        <select
          value={formData.tone}
          onChange={(e) =>
            setFormData({ ...formData, tone: e.target.value })
          }
          className="w-full p-2 border rounded-lg text-sm"
        >
          <option>Professional</option>
          <option>Conversational</option>
          <option>Energetic</option>
          <option>Bold</option>
          <option>Urgent / FOMO</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="text-xs text-slate-500 block mb-1">
          Language
        </label>
        <select
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="w-full p-2 border rounded-lg text-sm"
        >
          <option>English</option>
          <option>Hinglish</option>
          <option>Hindi</option>
          <option>Kannada</option>
          <option>Marathi</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={submitCampaign}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          Regenerate All
        </button>
      </div>
    </div>
  );
}