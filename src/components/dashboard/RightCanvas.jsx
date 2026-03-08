import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Loader2, Clock, Copy } from 'lucide-react';
import PlatformCard from '../cards/PlatformCard'; 

// Accept the dark mode props from App.jsx
export default function RightCanvas({ darkMode, toggleDarkMode }) {
  const { loading, results, error, formData } = useCampaign();

  // Mathematical Calculation for Time Saved
  const generatedCount = results ? Object.keys(results).length : 0;
  const estimatedTimeSaved = (generatedCount * 1.5).toFixed(1); 

  // Calculate average engagement score
  const totalScore = results 
    ? Object.values(results).reduce((acc, curr) => acc + (curr.engagement?.total || 0), 0) 
    : 0;
  const avgScore = generatedCount ? Math.round(totalScore / generatedCount) : 0;

  return (
    <div className="flex-1 bg-slate-50 dark:bg-[#0f172a] p-8 overflow-y-auto flex flex-col gap-6 transition-colors duration-300">
      
      {/* 🚀 THE DYNAMIC TOP STATS BAR */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-4 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-8 divide-x divide-slate-100 dark:divide-gray-700">
          <div className="pr-4">
            <div className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">Language</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-gray-100">{formData?.language || "English"}</div>
          </div>
          <div className="px-4">
            <div className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">Platforms</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-gray-100">{generatedCount || (formData?.platforms?.length || 0)} Active</div>
          </div>
          <div className="px-4 flex items-center gap-3">
            <div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">Overall Score</div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${avgScore > 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {avgScore}/100
                </span>
              </div>
            </div>
          </div>
          <div className="pl-4">
            <div className="text-[10px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12}/> Est. Time Saved</div>
            <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{estimatedTimeSaved} Hours</div>
          </div>
        </div>
        
        {/* NEW BUTTON PLACEMENT */}
        <div className="flex items-center gap-3">
           <button 
             onClick={toggleDarkMode} 
             className="p-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors border border-transparent dark:border-gray-600"
             title="Toggle Dark Mode"
           >
             {darkMode ? "☀️" : "🌙"}
           </button>

           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
              <Copy size={16}/> Copy All
           </button>
        </div>
      </div>

      {/* THE MAIN CANVAS CONTENT */}
      <div className="max-w-6xl mx-auto w-full">
        {loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-32">
            <Loader2 size={48} className="animate-spin text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-200">Orchestrating Campaign...</h2>
            <p className="text-sm dark:text-gray-400">Amazon Nova Micro is processing your request</p>
          </div>
        )}

        {/* NEW BEGINNER TIPS UI */}
        {!loading && !results && !error && (
          <div className="h-full flex flex-col items-center justify-center mt-10">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-white mb-2">Welcome to PersonaPulse! 👋</h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 text-center max-w-md mb-8">Let's create high-converting omnichannel campaigns in seconds. Here are a few tips to get the best results:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:border-orange-200 dark:hover:border-orange-500/50 transition-colors">
                    <div className="text-xl mb-2">🎯</div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-1">Be Specific with Ideas</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">Instead of "AI tools", try "How AI helps Indian MSMEs reduce logistics costs by 20%". Specificity drives engagement.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:border-orange-200 dark:hover:border-orange-500/50 transition-colors">
                    <div className="text-xl mb-2">🗣️</div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-1">Match Tone to Audience</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">Selecting 'Conversational' works best for Instagram, while 'Professional' combined with 'Founders' yields great LinkedIn authority.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:border-orange-200 dark:hover:border-orange-500/50 transition-colors">
                    <div className="text-xl mb-2">🇮🇳</div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-1">Leverage Bharat Localization</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">Targeting Tier-2 cities? Select 'Hinglish', 'Hindi', or 'Kannada' to generate content that culturally resonates with local audiences.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:border-orange-200 dark:hover:border-orange-500/50 transition-colors">
                    <div className="text-xl mb-2">✏️</div>
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 mb-1">Edit & Copy Instantly</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">Once generated, you can click directly inside the text cards to make manual edits before hitting the Copy button.</p>
                </div>
            </div>
          </div>
        )}

        {error && <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl mt-8">{error}</div>}

        {/* Note: The dashed Omnichannel Canvas box has been completely removed! */}

        {results && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start mt-8">
            {Object.entries(results).map(([platform, data]) => (
              <PlatformCard key={platform} platform={platform} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}