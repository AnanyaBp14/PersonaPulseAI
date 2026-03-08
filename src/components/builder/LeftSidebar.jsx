import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Sparkles, Linkedin, Twitter, Instagram, MessageCircle, Clock, Trash2 } from 'lucide-react';

const AVAILABLE_PLATFORMS = [
  { id: 'LinkedIn', icon: Linkedin }, { id: 'Twitter', icon: Twitter },
  { id: 'Instagram', icon: Instagram }, { id: 'WhatsApp', icon: MessageCircle }
];

export default function LeftSidebar({ onOpenLogin }) {
  const { formData, setFormData, submitCampaign, loading, history, loadHistoryItem, deleteHistoryItem } = useCampaign();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const userEmail = user?.signInDetails?.loginId || user?.attributes?.email || user?.username;

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform) ? prev.platforms.filter(p => p !== platform) : [...prev.platforms, platform]
    }));
  };

  return (
    <div className="w-[400px] bg-white dark:bg-gray-800 border-r border-orange-200 dark:border-gray-700 h-screen flex flex-col shadow-sm relative z-20 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="p-6 border-b border-orange-100 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800 shrink-0 transition-colors duration-300">
        <div className="bg-orange-500 p-2.5 rounded-xl text-white shadow"><Sparkles size={22} /></div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            PersonaPulse
            <span className="text-orange-600 dark:text-orange-400 text-[10px] font-bold bg-orange-50 dark:bg-orange-500/20 px-2 py-1 rounded-full ml-1 uppercase">PRO</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-gray-400">AI Content Orchestration</p>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-8">
        <div className="space-y-6">
          
          {/* CORE IDEA */}
          <div>
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-200">Core Campaign Idea</label>
            <textarea 
              value={formData.idea} 
              onChange={(e) => setFormData({ ...formData, idea: e.target.value })} 
              placeholder="e.g., AI impact on EXIM..." 
              className="w-full mt-2 p-4 border border-orange-200 dark:border-gray-600 bg-transparent dark:bg-gray-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-500/50 focus:border-orange-500 outline-none resize-none h-24 text-sm transition-colors" 
            />
          </div>

          {/* PLATFORMS */}
          <div>
            <label className="text-sm font-semibold text-slate-800 dark:text-gray-200">Target Platforms</label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {AVAILABLE_PLATFORMS.map(({ id, icon: Icon }) => {
                const isActive = formData.platforms.includes(id);
                return (
                  <button 
                    key={id} 
                    onClick={() => handlePlatformToggle(id)} 
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-colors ${
                      isActive 
                        ? "bg-orange-50 dark:bg-orange-500/20 border-orange-300 dark:border-orange-500/50 text-orange-700 dark:text-orange-400 font-semibold" 
                        : "border-slate-200 dark:border-gray-600 hover:border-orange-200 dark:hover:border-gray-500 text-slate-600 dark:text-gray-300"
                    }`}
                  >
                    <Icon size={18} /> {id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AUDIENCE & TONE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase mb-2 block">Audience</label>
              <select 
                value={formData.audience} 
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })} 
                className="w-full p-2 border border-orange-200 dark:border-gray-600 bg-transparent dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg text-sm focus:border-orange-500 transition-colors"
              >
                <option value="Professionals">Professionals</option>
                <option value="Founders">Founders</option>
                <option value="Students">Students</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase mb-2 block">Tone</label>
              <select 
                value={formData.tone} 
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })} 
                className="w-full p-2 border border-orange-200 dark:border-gray-600 bg-transparent dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg text-sm focus:border-orange-500 transition-colors"
              >
                <option value="Professional">Professional</option>
                <option value="Conversational">Conversational</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* LOCALIZATION */}
          <div className="p-4 bg-orange-50 dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-gray-700 transition-colors">
            <label className="text-sm font-bold text-orange-800 dark:text-orange-400">🇮🇳 Bharat Localization</label>
            <select 
              value={formData.language} 
              onChange={(e) => setFormData({ ...formData, language: e.target.value })} 
              className="w-full mt-2 p-2 border border-orange-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white rounded-lg text-sm transition-colors"
            >
              <option value="English">English</option>
              <option value="Hinglish">Hinglish</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>
        </div>

        {/* HISTORY SECTION */}
        {history.length > 0 && (
          <div className="pt-6 border-t border-orange-100 dark:border-gray-700">
            <label className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase flex items-center gap-1 mb-3">
              <Clock size={14}/> Recent Campaigns
            </label>
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="group relative w-full flex items-center">
                  <button 
                    onClick={() => loadHistoryItem(item)} 
                    className="w-full text-left p-3 pr-10 rounded-xl border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50 hover:bg-orange-50 dark:hover:bg-gray-800 hover:border-orange-200 dark:hover:border-gray-600 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-700 dark:text-gray-300 truncate">{item.idea}</div>
                    <div className="text-[10px] text-slate-400 dark:text-gray-500 mt-1">{item.time}</div>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }}
                    className="absolute right-2 p-1.5 text-slate-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GENERATE BUTTON */}
      <div className="p-6 border-t border-orange-100 dark:border-gray-800 bg-orange-50 dark:bg-gray-900 shrink-0 transition-colors">
        <button 
          onClick={submitCampaign} 
          disabled={loading || !formData.idea} 
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 dark:disabled:bg-orange-800/50 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-md transition-all"
        >
          {loading ? "Generating..." : "Generate Campaign"}
        </button>
      </div>

      {/* FOOTER / AUTH */}
      <div className="p-4 border-t border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between shrink-0 transition-colors">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-700 dark:text-orange-400 font-bold shrink-0">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'G'}
          </div>
          <div className="flex flex-col truncate">
            <div className="text-xs font-bold text-slate-700 dark:text-gray-200 truncate">{userEmail ? userEmail : 'Guest User'}</div>
            <div className={`text-[10px] font-medium ${user ? 'text-green-600 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'}`}>
              {user ? 'History synced' : 'History local'}
            </div>
          </div>
        </div>
        {user ? (
          <button 
            onClick={signOut} 
            className="text-xs font-semibold text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-lg transition-colors"
          >
            Log Out
          </button>
        ) : (
          <button 
            onClick={onOpenLogin} 
            className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 hover:bg-orange-200 dark:hover:bg-orange-500/40 px-3 py-2 rounded-lg transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}