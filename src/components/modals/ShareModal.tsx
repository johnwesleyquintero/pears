import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, MessageCircle, Twitter, Facebook } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setShareModalOpen, shareUrl } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[36px] max-w-md w-full shadow-2xl border border-slate-100 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-lime-600" />
            <h3 className="font-black text-slate-800 text-lg">Share Post</h3>
          </div>
          <button
            onClick={() => setShareModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Social Quick Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check%20out%20this%20post%20on%20Pears!`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-2xl flex flex-col items-center gap-2 font-bold text-xs transition-colors"
          >
            <Twitter className="w-6 h-6" />
            <span>Twitter / X</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl flex flex-col items-center gap-2 font-bold text-xs transition-colors"
          >
            <Facebook className="w-6 h-6" />
            <span>Facebook</span>
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-2xl flex flex-col items-center gap-2 font-bold text-xs transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Copy Link box */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Copy Direct Link
          </label>
          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-slate-600 px-3 py-1 flex-1 outline-none font-mono truncate select-all"
            />
            <button
              onClick={handleCopy}
              className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
