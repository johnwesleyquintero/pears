import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Compass, Users, Flame, UserCheck, ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, suggestedAccounts } = useApp();
  const { currentUser } = useAuth();

  return (
    <aside className="w-64 border-r border-slate-100 p-6 flex flex-col gap-8 bg-white shrink-0 overflow-y-auto hidden md:flex h-full select-none">
      {/* Feed Tabs Navigation */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTab('foryou')}
          className={`flex items-center gap-3 px-4 py-3 font-bold rounded-2xl transition-all cursor-pointer text-sm w-full text-left ${
            activeTab === 'foryou'
              ? 'bg-lime-50 text-lime-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-sm flex items-center justify-center ${activeTab === 'foryou' ? 'bg-lime-500 text-white' : 'border-2 border-slate-400'}`}>
            <Sparkles className="w-3 h-3" />
          </span>
          <span>For You</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`flex items-center gap-3 px-4 py-3 font-bold rounded-2xl transition-all cursor-pointer text-sm w-full text-left ${
            activeTab === 'explore'
              ? 'bg-lime-50 text-lime-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-sm flex items-center justify-center ${activeTab === 'explore' ? 'bg-lime-500 text-white' : 'border-2 border-slate-400'}`}>
            <Compass className="w-3 h-3" />
          </span>
          <span>Explore Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`flex items-center gap-3 px-4 py-3 font-bold rounded-2xl transition-all cursor-pointer text-sm w-full text-left ${
            activeTab === 'following'
              ? 'bg-lime-50 text-lime-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${activeTab === 'following' ? 'bg-lime-500 text-white' : 'border-2 border-slate-400'}`}>
            <Users className="w-3 h-3" />
          </span>
          <span>Following</span>
        </button>

        <button
          onClick={() => setActiveTab('trending')}
          className={`flex items-center gap-3 px-4 py-3 font-bold rounded-2xl transition-all cursor-pointer text-sm w-full text-left ${
            activeTab === 'trending'
              ? 'bg-lime-50 text-lime-700 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 font-medium'
          }`}
        >
          <span className={`w-5 h-5 rounded-sm flex items-center justify-center ${activeTab === 'trending' ? 'bg-lime-500 text-white' : 'border-2 border-slate-400'}`}>
            <Flame className="w-3 h-3" />
          </span>
          <span>Trending 🔥</span>
        </button>
      </div>

      {/* Suggested Accounts */}
      <div className="flex flex-col gap-4">
        <h3 className="px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Suggested Accounts
        </h3>
        <div className="flex flex-col gap-3.5">
          {suggestedAccounts.map((acc) => (
            <Link
              key={acc.UserID}
              to={`/profile/${acc.UserID}`}
              className="flex items-center gap-3 px-4 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <img
                src={acc.Avatar}
                alt={acc.Username}
                className="w-8 h-8 rounded-full bg-slate-200 object-cover ring-2 ring-transparent group-hover:ring-lime-400 transition-all shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate text-slate-800 group-hover:text-lime-600 transition-colors">
                  {acc.Username}
                </span>
                <span className="text-xs text-slate-400 truncate">{acc.Name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Architecture MVP Banner */}
      <div className="mt-auto p-4 bg-lime-50/60 rounded-2xl border border-lime-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-black text-lime-800">
          <Layers className="w-4 h-4 text-lime-600 shrink-0" />
          <span>Sheets DB Architecture</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Storage provider independent. Storing media URLs cleanly in Google Sheets.
        </p>
        <Link
          to="/settings"
          className="text-[11px] font-bold text-lime-700 hover:underline inline-flex items-center gap-1 mt-0.5"
        >
          Configure Apps Script API →
        </Link>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-tighter">
          About • Help • Privacy • Terms<br />
          © 2026 Pears Social MVP
        </p>
      </div>
    </aside>
  );
};
