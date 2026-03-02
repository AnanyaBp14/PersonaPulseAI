import React, { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  PenTool,
  Sparkles,
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const ICONS = {
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  WhatsApp: MessageCircle,
};

const COLORS = {
  LinkedIn: "text-blue-600",
  Twitter: "text-sky-500",
  Instagram: "text-pink-600",
  WhatsApp: "text-green-500",
};

export default function PlatformCard({ platform, data }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(
    `${data.hook}\n\n${data.content}\n\n${data.cta}\n\n${data.hashtags?.join(" ")}`
  );

  if (!data || data.error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
        Error: {data?.error || "Unknown error"}
      </div>
    );
  }

  const Icon = ICONS[platform] || Sparkles;
  const iconColor = COLORS[platform] || "text-slate-600";

  const score = data.engagement?.total || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden group">

      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 border flex items-center justify-center">
            <Icon size={20} className={iconColor} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">
              Acme Corp
            </div>
            <div className="text-[11px] text-slate-500 uppercase">
              {platform} Post
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 text-sm whitespace-pre-wrap">

        {editMode ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-64 border rounded-lg p-3 text-sm"
          />
        ) : (
          <>
            <p className="font-bold text-lg">{data.hook}</p>
            <p className="mt-3">{data.content}</p>
            <p className="mt-3 font-semibold">{data.cta}</p>
            <p className={`mt-3 ${iconColor}`}>
              {data.hashtags?.join(" ")}
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex justify-between items-center bg-slate-50">

        <div className="text-lg font-bold text-green-600">
          {score}/100
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-200 rounded-lg"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 hover:bg-slate-200 rounded-lg"
          >
            <PenTool size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}