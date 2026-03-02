import React, { createContext, useState, useContext } from "react";
import { generateCampaign } from "../services/api";

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    idea: "",
    platforms: ["LinkedIn"],
    audience: "Professionals",
    tone: "Professional",
    language: "English",
    cultural: true,
    include_image: true,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); // full backend response
  const [error, setError] = useState(null);

  const submitCampaign = async () => {
    if (!formData.idea || formData.platforms.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const data = await generateCampaign(formData);

      // Store FULL response (campaign_id + title + results)
      setResults(data);
    } catch (err) {
      console.error("Campaign Error:", err);
      setError("Failed to orchestrate campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
  };

  return (
    <CampaignContext.Provider
      value={{
        formData,
        setFormData,
        loading,
        results,
        error,
        submitCampaign,
        clearResults,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => useContext(CampaignContext);