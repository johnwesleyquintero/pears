import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Bell, Heart, MessageCircle, UserPlus, Sparkles, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, refreshFeed } = useApp();
  const { currentUser, setLoginModalOpen } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <Bell className="w-16 h-16 text-slate-300 stroke-1 mb-4" />
        <h2 className="text-xl font-black text-slate-800 mb-2">Sign in for Notifications</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          Connect your Google Account to receive real-time alerts when creators like your short videos or follow you.
        </p>
        <button
          onClick={() => setLoginModalOpen(true)}
          className="bg-lime-500 hover:bg-lime-600 text-white font-black py-3 px-8 rounded-full shadow-lg shadow-lime-200 text-sm transition-all"
        >
          Google Sign-In
        </button>
      </div>
    );
  }

  const icons = {
    like: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
    comment: <MessageCircle className="w-4 h-4 text-lime-600 fill-lime-100" />,
    follow: <UserPlus className="w-4 h-4 text-sky-500" />
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden pb-12">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-100 rounded-2xl flex items-center justify-center text-lime-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Activity & Notifications</h1>
              <p className="text-xs text-slate-400 font-bold">Real-time alerts stored in Google Sheets</p>
            </div>
          </div>
          <button
            onClick={refreshFeed}
            className="text-xs font-bold text-lime-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark read</span>
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-2">
              <Sparkles className="w-12 h-12 mx-auto text-slate-200" />
              <p className="text-sm font-bold">No notifications yet</p>
              <p className="text-xs">When someone likes or comments on your posts, it'll show up here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.NotificationID} className="p-6 hover:bg-slate-50/80 transition-colors flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 shadow-xs border border-white">
                  {icons[notif.Type]}
                </div>

                <Link to={`/profile/${notif.SenderID}`} className="shrink-0">
                  <img
                    src={notif.sender?.Avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt="Actor"
                    className="w-11 h-11 rounded-full object-cover bg-slate-200 border-2 border-white shadow-xs"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    <Link to={`/profile/${notif.SenderID}`} className="font-black hover:text-lime-600 transition-colors">
                      {notif.sender?.Username || 'someone'}
                    </Link>{' '}
                    {notif.Type === 'like' && 'liked your short video post.'}
                    {notif.Type === 'comment' && 'commented on your post.'}
                    {notif.Type === 'follow' && 'started following you!'}
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    {new Date(notif.CreatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {notif.post && (
                  <Link to={`/post/${notif.post.PostID}`} className="shrink-0">
                    <img
                      src={notif.post.ThumbnailURL || notif.post.MediaURL}
                      alt="Ref"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                    />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
