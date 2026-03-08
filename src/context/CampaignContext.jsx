import React, { createContext, useState, useContext, useEffect } from "react";
import { generateCampaign } from "../services/api";
import { useAuthenticator } from "@aws-amplify/ui-react";

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  
  // Create a unique save slot for whoever is logged in (or "guest")
  const userKey = user?.signInDetails?.loginId || "guest";
  const storageKey = `personapulse_history_${userKey}`;

  const [formData, setFormData] = useState({
    idea: "", platforms: ["LinkedIn"], audience: "Professionals", tone: "Professional", language: "English", cultural: true, include_image: true,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); 
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // 🔥 LOAD HISTORY: Runs whenever the user logs in or out
  useEffect(() => {
    const savedHistory = localStorage.getItem(storageKey);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      setHistory([]); // Empty history for new users
    }
    
    // 👇 NEW: Clear the screen and text box when switching accounts!
    setResults(null);
    setFormData(prev => ({ ...prev, idea: "" }));
    
  }, [userKey, storageKey]);

  // 🔥 SAVE HISTORY: Runs automatically whenever a new campaign is added
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(history));
  }, [history, storageKey]);

  const submitCampaign = async () => {
    if (!formData.idea || formData.platforms.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const data = await generateCampaign(formData);
      const generatedPosts = data.results || data;
      setResults(generatedPosts);
      
      // Add the new generation to the top of the history list
      setHistory(prev => [{
        id: Date.now(),
        idea: formData.idea,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        results: generatedPosts
      }, ...prev]);
      
    } catch (err) {
      console.error("Campaign Error:", err);
      setError("Failed to orchestrate campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (item) => {
    setFormData(prev => ({ ...prev, idea: item.idea }));
    setResults(item.results);
  };

  const clearResults = () => setResults(null);

  // 🔥 NEW: Function to delete a specific item from history
  const deleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
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
        history, 
        loadHistoryItem,
        deleteHistoryItem // 🔥 NEW: Added to the provider
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => useContext(CampaignContext);