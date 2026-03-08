import React, { useState, useEffect } from 'react';
import { Copy, Check, Edit3, Save } from 'lucide-react';

export default function PlatformCard({ platform, data }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const getPostText = (payload) => {
    if (!payload) return "";
    if (typeof payload === 'string') return payload;
    return payload.post || payload.content || JSON.stringify(payload);
  };

  const [content, setContent] = useState(getPostText(data));

  useEffect(() => {
    setContent(getPostText(data));
    setIsEditing(false); // Reset edit mode on new content
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="bg-orange-50/30 dark:bg-gray-800 rounded-2xl border border-orange-200 dark:border-gray-700 flex flex-col shadow-sm overflow-hidden h-[400px] transition-colors duration-300">
      
      {/* HEADER */}
      <div className="p-4 border-b border-orange-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-gray-100">{platform} Post</h3>
        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-md">
            {data?.engagement?.total || 99}/100
        </span>
      </div>

      {/* TEXT AREA */}
      <div className={`p-4 flex-1 flex flex-col transition-colors ${isEditing ? 'bg-white dark:bg-gray-800' : 'bg-orange-50/20 dark:bg-gray-900'}`}>
         <textarea
           readOnly={!isEditing}
           value={content}
           onChange={(e) => setContent(e.target.value)}
           className={`w-full flex-1 bg-transparent resize-none outline-none text-slate-700 dark:text-gray-300 text-sm leading-relaxed ${isEditing ? 'ring-1 ring-orange-200 dark:ring-gray-600 p-2 rounded-lg' : ''}`}
         />
      </div>

      {/* FOOTER */}
      <div className="p-3 bg-white dark:bg-gray-800 border-t border-orange-100 dark:border-gray-700 flex justify-end gap-2 transition-colors">
        {/* EDIT / SAVE BUTTON */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${isEditing ? 'bg-green-600 dark:bg-green-700 text-white shadow-md' : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600'}`}
        >
          {isEditing ? <><Save size={14}/> Save Changes</> : <><Edit3 size={14}/> Edit</>}
        </button>

        {/* COPY BUTTON */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
        >
          {copied ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy Post</>}
        </button>
      </div>
    </div>
  );
}