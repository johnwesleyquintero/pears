import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Database, ShieldAlert, CheckCircle2, Copy, ExternalLink, RefreshCw, Layers, Server, Code2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { appsScriptConfig, updateAppsScriptConfig, resetAllData } = useApp();
  const { currentUser } = useAuth();

  const [webAppUrl, setWebAppUrl] = useState(appsScriptConfig.webAppUrl);
  const [enabled, setEnabled] = useState(appsScriptConfig.enabled);
  const [savedMessage, setSavedMessage] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'sheet' | 'script'>('script');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppsScriptConfig({
      enabled,
      webAppUrl: webAppUrl.trim()
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const APPS_SCRIPT_SAMPLE_CODE = `/**
 * Pears MVP - Google Apps Script Backend
 * Connects React UI directly to Google Sheets database.
 */

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  if (action === "getPosts") {
    const sheet = ss.getSheetByName("Posts");
    const data = sheet.getDataRange().getValues();
    return createJsonResponse(formatRecords(data));
  }
  
  return createJsonResponse({ status: "ok", app: "Pears MVP" });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  if (body.action === "createPost") {
    const sheet = ss.getSheetByName("Posts");
    sheet.appendRow([
      body.PostID, body.UserID, body.MediaType, body.MediaURL,
      body.ThumbnailURL, body.Caption, body.Visibility, new Date()
    ]);
    return createJsonResponse({ success: true });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 py-8 px-4 md:px-12 flex flex-col items-center select-none">
      <div className="w-full max-w-4xl space-y-8 pb-24">
        {/* Banner */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12">
          <div className="flex items-center gap-3 text-lime-600 mb-2">
            <Layers className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-widest bg-lime-100 px-2.5 py-1 rounded-lg text-lime-800">
              Architecture Blueprint
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            React + Apps Script + Google Sheets
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Pears is engineered to be lightweight, modular, and inexpensive to operate. The frontend is entirely independent of any media provider (Google Drive, TeraBox, Cloudinary). Only media URLs are persisted in Sheets.
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white rounded-[36px] border border-slate-100 p-8 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-lime-500" />
              <span>Apps Script Web App Endpoint</span>
            </h2>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
              {enabled ? '● Live Sheets Sync API' : '○ Local MVP Storage Engine'}
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Google Apps Script Web App URL
              </label>
              <input
                type="url"
                value={webAppUrl}
                onChange={(e) => setWebAppUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-mono focus:bg-white focus:ring-2 focus:ring-lime-500 outline-none transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Deploy your Apps Script as a Web App accessible by "Anyone" to enable cloud synchronization.
              </p>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="enableSync"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-5 h-5 text-lime-500 rounded focus:ring-lime-400 accent-lime-500 cursor-pointer"
              />
              <label htmlFor="enableSync" className="text-sm font-bold text-slate-800 cursor-pointer">
                Enable Remote Apps Script API (Sync Posts & Likes to Google Sheets)
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={resetAllData}
                className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-2xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset MVP Sample Data</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-lime-500 hover:bg-lime-600 text-white font-black rounded-full text-xs transition-all shadow-md shadow-lime-200 cursor-pointer flex items-center gap-2"
              >
                {savedMessage ? <CheckCircle2 className="w-4 h-4" /> : null}
                <span>{savedMessage ? 'Saved!' : 'Save Endpoint'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sheets Schema & Code Reference */}
        <div className="bg-slate-900 rounded-[36px] overflow-hidden shadow-2xl text-white">
          <div className="p-6 bg-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-lime-400">
              <Code2 className="w-4 h-4" />
              <span>Google Sheets Database Structure & Backend Code</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCodeTab('script')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeCodeTab === 'script' ? 'bg-lime-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                Code (Code.gs)
              </button>
              <button
                onClick={() => setActiveCodeTab('sheet')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeCodeTab === 'sheet' ? 'bg-lime-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                Schema Tabs
              </button>
            </div>
          </div>

          <div className="p-6 font-mono text-xs overflow-x-auto max-h-[400px]">
            {activeCodeTab === 'script' ? (
              <pre className="text-lime-300 leading-relaxed select-all">{APPS_SCRIPT_SAMPLE_CODE}</pre>
            ) : (
              <div className="space-y-6 text-slate-300">
                <div>
                  <h4 className="text-white font-bold mb-1 text-lime-400">📋 Tab 1: Users</h4>
                  <p className="text-[11px] text-slate-400">UserID | GoogleID | Name | Username | Avatar | Bio | JoinedAt</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lime-400">📋 Tab 2: Posts</h4>
                  <p className="text-[11px] text-slate-400">PostID | UserID | MediaType | MediaURL | ThumbnailURL | Caption | Visibility | CreatedAt</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lime-400">📋 Tab 3: Likes</h4>
                  <p className="text-[11px] text-slate-400">LikeID | PostID | UserID | CreatedAt</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lime-400">📋 Tab 4: Comments</h4>
                  <p className="text-[11px] text-slate-400">CommentID | PostID | UserID | Comment | CreatedAt</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
