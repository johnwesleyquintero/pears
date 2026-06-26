import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { ArrowLeft } from 'lucide-react';

export const SinglePostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts } = useApp();

  const post = posts.find(p => p.PostID === postId);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 py-8 px-4 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-[480px]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-200 mb-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-lime-600" />
          <span>Back to Feed</span>
        </Link>

        {post ? (
          <PostCard post={post} isActive={true} />
        ) : (
          <div className="bg-white rounded-[40px] p-12 text-center border border-slate-100 space-y-3">
            <h3 className="font-black text-lg text-slate-800">Post not found</h3>
            <p className="text-xs text-slate-500">This short video or image may have been removed.</p>
          </div>
        )}
      </div>
    </div>
  );
};
