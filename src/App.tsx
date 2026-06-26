/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { RightPanel } from './components/layout/RightPanel';
import { CommentPanel } from './components/feed/CommentPanel';
import { UploadModal } from './components/modals/UploadModal';
import { ShareModal } from './components/modals/ShareModal';
import { LoginModal } from './components/modals/LoginModal';

import { HomeFeed } from './pages/HomeFeed';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { SinglePostPage } from './pages/SinglePostPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          {/* Main Container styled according to Vibrant Palette specifications */}
          <div className="flex flex-col w-full h-screen bg-white text-slate-900 font-sans overflow-hidden">
            {/* Header Navigation */}
            <Navbar />

            {/* Main Content Layout */}
            <div className="flex flex-1 overflow-hidden bg-slate-50 relative">
              {/* Left Sidebar */}
              <Sidebar />

              {/* Center Feed / Page Viewport */}
              <Routes>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/post/:postId" element={<SinglePostPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>

              {/* Right Panel (Explore/Trending) */}
              <RightPanel />
            </div>

            {/* Slide-over Panels and Modals */}
            <CommentPanel />
            <UploadModal />
            <ShareModal />
            <LoginModal />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}
