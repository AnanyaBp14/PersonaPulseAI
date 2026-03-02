import axios from 'axios';

// Replace this with your actual API Gateway URL
const API_URL = import.meta.env.VITE_API_URL;
export const generateCampaign = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};