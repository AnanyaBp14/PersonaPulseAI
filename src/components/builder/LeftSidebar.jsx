import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Sparkles, Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';

const AVAILABLE_PLATFORMS = [
  { id: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50' },
  { id: 'Twitter', icon: Twitter, color: 'text-sky-500', border: 'border-sky-200', bg: 'bg-sky-50' },
  { id: 'Instagram', icon: Instagram, color: 'text-pink-600', border: 'border-pink-200', bg: 'bg-pink-50' },
  { id: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', border: 'border-green-200', bg: 'bg-green-50' }
];

export default function LeftSidebar({ user, signOut }) {
  const { formData, setFormData, submitCampaign, loading } = useCampaign();

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  return (
    <div className="w-[400px] bg-white border-r border-slate-200 h-screen overflow-y-auto flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-white sticky top-0 z-20">
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 text-white">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">PersonaPulse <span className="text-indigo-600 text-[10px] font-bold bg-indigo-50 px-2 py-1 rounded-full ml-1 align-top uppercase tracking-wider">PRO</span></h1>
          <p className="text-xs text-slate-500 font-medium">AI Content Orchestration</p>
        </div>
      </div>

      <div className="p-6 flex-1 space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-800">Core Campaign Idea</label>
          <textarea 
            value={formData.idea}
            onChange={(e) => setFormData({...formData, idea: e.target.value})}
            placeholder="e.g., Impact of AI on India's EXIM sector..."
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none resize-none h-32 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-800 flex justify-between items-center">
            Target Platforms <span className="text-xs font-normal text-slate-400">Select multiple</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_PLATFORMS.map(({ id, icon: Icon, color, border, bg }) => {
              const isActive = formData.platforms.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => handlePlatformToggle(id)}
                  className={`flex items-center gap-2 p-3.5 rounded-xl border transition-all duration-200 ${
                    isActive 
                      ? `${border} ${bg} text-slate-900 shadow-sm transform scale-[0.98]` 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} className={isActive ? color : 'text-slate-400'} />
                  <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{id}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Audience</label>
              <select 
                value={formData.audience} onChange={(e) => setFormData({...formData, audience: e.target.value})}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm font-medium focus:border-indigo-500"
              >
                <option>Professionals</option><option>Founders</option><option>Students</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tone</label>
              <select 
                value={formData.tone} onChange={(e) => setFormData({...formData, tone: e.target.value})}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm font-medium focus:border-indigo-500"
              >
                <option>Professional</option><option>Conversational</option><option>Urgent</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/60 shadow-inner">
            <label className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-2">
              🇮🇳 Bharat Localization
            </label>
            <select 
              value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full p-2.5 border border-amber-200 rounded-lg outline-none bg-white text-amber-900 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-amber-200"
            >
              <option>English</option><option>Hinglish</option><option>Hindi</option><option>Marathi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <button 
          onClick={submitCampaign}
          disabled={loading || !formData.idea || formData.platforms.length === 0}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-[0_8px_16px_-6px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2 animate-pulse"><Sparkles size={18}/> Orchestrating AI...</span>
          ) : (
            <><Sparkles size={18}/> Generate Campaign</>
          )}
        </button>
      </div>

       {/* USER PROFILE & LOGOUT SECTION */}
       <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
            {user?.signInDetails?.loginId?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-xs font-medium text-slate-600 truncate">
            {user?.signInDetails?.loginId || 'Logged In'}
          </div>
        </div>
        <button 
          onClick={signOut}
          className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}