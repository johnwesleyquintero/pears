import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { X, Send, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommentPanel: React.FC = () => {
  const { activeCommentPost, setActiveCommentPost, getComments, addComment } = useApp();
  const { currentUser, setLoginModalOpen } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!activeCommentPost) return null;

  const comments = getComments(activeCommentPost.PostID);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }
    addComment(activeCommentPost.PostID, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-100 animate-slide-left">
        {/* Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-lime-600" />
            <h3 className="font-black text-slate-800 text-lg">
              Comments ({activeCommentPost.commentsCount})
            </h3>
          </div>
          <button
            onClick={() => setActiveCommentPost(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post snippet */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
          <img
            src={activeCommentPost.ThumbnailURL || activeCommentPost.MediaURL}
            alt="Thumbnail"
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0 flex-1 text-xs">
            <span className="font-bold text-slate-800">@{activeCommentPost.user?.Username}</span>
            <p className="text-slate-500 truncate mt-0.5">{activeCommentPost.Caption}</p>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <MessageCircle className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-2" />
              <p className="text-sm font-bold">No comments yet</p>
              <p className="text-xs mt-1">Be the first to share what you think!</p>
            </div>
          ) : (
            comments.map((cmt) => (
              <div key={cmt.CommentID} className="flex gap-3.5 items-start group">
                <Link to={`/profile/${cmt.UserID}`} onClick={() => setActiveCommentPost(null)}>
                  <img
                    src={cmt.user?.Avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={cmt.user?.Username}
                    className="w-9 h-9 rounded-full object-cover bg-slate-200 shrink-0 border border-slate-100"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/profile/${cmt.UserID}`}
                      onClick={() => setActiveCommentPost(null)}
                      className="text-xs font-bold text-slate-800 hover:text-lime-600 transition-colors"
                    >
                      @{cmt.user?.Username || 'user'}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {new Date(cmt.CreatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1 break-words">
                    {cmt.Comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          {currentUser && (
            <img
              src={currentUser.Avatar}
              alt="You"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          )}
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={currentUser ? "Add a comment..." : "Sign in to comment..."}
            className="flex-1 bg-slate-100 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 bg-lime-500 hover:bg-lime-600 disabled:opacity-40 disabled:hover:bg-lime-500 text-white rounded-full transition-all shadow-md shadow-lime-200 cursor-pointer active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
