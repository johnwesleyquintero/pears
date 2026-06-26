import React, { useRef, useState, useEffect } from 'react';
import { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Play, Pause, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  isActive?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isActive = true }) => {
  const { toggleLike, toggleBookmark, setActiveCommentPost, openShareModal, setSelectedHashtag } = useApp();
  const { currentUser, setLoginModalOpen } = useAuth();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [likeHeartAnimation, setLikeHeartAnimation] = useState(false);

  // Auto Play Videos when in view
  useEffect(() => {
    if (post.MediaType === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, post.MediaType]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDoubleTap = () => {
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }
    if (!post.isLikedByMe) {
      toggleLike(post.PostID);
    }
    setLikeHeartAnimation(true);
    setTimeout(() => setLikeHeartAnimation(false), 800);
  };

  // Parse hashtags from caption
  const words = post.Caption.split(' ');
  const hashtags = words.filter(w => w.startsWith('#'));
  const cleanCaption = words.filter(w => !w.startsWith('#')).join(' ');

  return (
    <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/60 flex flex-col overflow-hidden border border-slate-100 h-[640px] md:h-[700px] select-none relative group">
      {/* Media Viewport */}
      <div 
        className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={post.MediaType === 'video' ? togglePlayPause : handleDoubleTap}
        onDoubleClick={handleDoubleTap}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />

        {/* Media Render (independent of storage provider) */}
        {post.MediaType === 'video' ? (
          <video
            ref={videoRef}
            src={post.MediaURL}
            poster={post.ThumbnailURL}
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={post.MediaURL}
            alt={post.Caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
        )}

        {/* Double Tap Big Heart Overlay */}
        {likeHeartAnimation && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-ping">
            <Heart className="w-32 h-32 text-rose-500 fill-rose-500 drop-shadow-2xl" />
          </div>
        )}

        {/* Video Controls Top Left */}
        {post.MediaType === 'video' && (
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors border border-white/20 shadow-md cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
            </button>
            <span className="text-[10px] font-mono text-white/80 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm uppercase">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        )}

        {/* MediaType badge top right */}
        <div className="absolute top-6 right-6 z-20">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/30 shadow-md">
            {post.MediaType}
          </span>
        </div>

        {/* Interaction Overlay Right Rail matching Design specifications */}
        <div className="absolute right-4 bottom-28 flex flex-col gap-6 items-center z-20">
          {/* Like Button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!currentUser) setLoginModalOpen(true);
                else toggleLike(post.PostID);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border shadow-lg active:scale-90 cursor-pointer ${
                post.isLikedByMe
                  ? 'bg-rose-500 border-rose-400 text-white shadow-rose-500/40 scale-110'
                  : 'bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-rose-500/80 hover:border-rose-300'
              }`}
            >
              <Heart className={`w-6 h-6 ${post.isLikedByMe ? 'fill-white text-white' : ''}`} />
            </button>
            <span className="text-white text-xs font-black drop-shadow-md">
              {post.likesCount > 1000 ? `${(post.likesCount / 1000).toFixed(1)}K` : post.likesCount}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveCommentPost(post);
              }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-lime-500 transition-colors border border-white/30 shadow-lg text-white active:scale-90 cursor-pointer group/cmt"
            >
              <MessageCircle className="w-6 h-6 group-hover/cmt:scale-110 transition-transform" />
            </button>
            <span className="text-white text-xs font-black drop-shadow-md">
              {post.commentsCount}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openShareModal(`${window.location.origin}/post/${post.PostID}`);
              }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors border border-white/30 shadow-lg text-white active:scale-90 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-white text-xs font-black drop-shadow-md">Share</span>
          </div>

          {/* Bookmark Button */}
          <div className="flex flex-col items-center mt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!currentUser) setLoginModalOpen(true);
                else toggleBookmark(post.PostID);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-lg cursor-pointer ${
                post.isBookmarkedByMe
                  ? 'bg-amber-400 border-amber-300 text-slate-900 shadow-amber-400/40'
                  : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/30'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${post.isBookmarkedByMe ? 'fill-slate-900' : ''}`} />
            </button>
          </div>
        </div>

        {/* Post Content Bottom Overlay matching Design specifications */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
          <div className="flex items-center gap-3.5 mb-3.5">
            <Link to={`/profile/${post.UserID}`} className="shrink-0" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full border-2 border-lime-400 p-0.5 shadow-lg bg-white">
                <img
                  src={post.user?.Avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={post.user?.Username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </Link>
            <div className="min-w-0 flex-1">
              <Link to={`/profile/${post.UserID}`} onClick={(e) => e.stopPropagation()}>
                <h4 className="text-white font-black text-base hover:text-lime-400 transition-colors flex items-center gap-1.5 truncate">
                  <span>@{post.user?.Username || 'creator'}</span>
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-sm font-normal">
                    Creator
                  </span>
                </h4>
              </Link>
              <p className="text-white/90 text-sm font-medium leading-relaxed mt-0.5 line-clamp-2">
                {cleanCaption}
              </p>
            </div>
          </div>

          {/* Hashtags row */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHashtag(tag);
                  }}
                  className="px-3 py-1 bg-white/10 hover:bg-lime-500 hover:border-lime-400 transition-all backdrop-blur-sm rounded-full text-[10px] text-white font-bold uppercase tracking-wider border border-white/20 cursor-pointer shadow-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar matching Design specifications */}
      <div className="h-1.5 w-full bg-slate-100 shrink-0">
        <div
          className="h-full bg-lime-500 transition-all duration-300 shadow-xs shadow-lime-300"
          style={{ width: post.MediaType === 'video' ? `${progress}%` : '100%' }}
        />
      </div>
    </div>
  );
};
