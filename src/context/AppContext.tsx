import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Post, User, Notification, Comment, AppsScriptConfig } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

export type FeedTab = 'foryou' | 'explore' | 'following' | 'trending';

interface AppContextType {
  posts: Post[];
  filteredPosts: Post[];
  activeTab: FeedTab;
  setActiveTab: (tab: FeedTab) => void;
  trendingTopics: string[];
  suggestedAccounts: User[];
  notifications: Notification[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedHashtag: string | null;
  setSelectedHashtag: (tag: string | null) => void;
  activeCommentPost: Post | null;
  setActiveCommentPost: (post: Post | null) => void;
  isUploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;
  shareUrl: string;
  openShareModal: (url: string) => void;
  appsScriptConfig: AppsScriptConfig;
  updateAppsScriptConfig: (cfg: AppsScriptConfig) => void;
  refreshFeed: () => void;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  toggleFollow: (targetUserId: string) => boolean;
  isFollowing: (targetUserId: string) => boolean;
  addPost: (data: Omit<Post, 'PostID' | 'CreatedAt' | 'likesCount' | 'commentsCount'>) => Post;
  addComment: (postId: string, text: string) => Comment;
  getComments: (postId: string) => Comment[];
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<FeedTab>('foryou');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeCommentPost, setActiveCommentPost] = useState<Post | null>(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [appsScriptConfig, setAppsScriptConfig] = useState<AppsScriptConfig>({
    enabled: false,
    webAppUrl: ''
  });

  const trendingTopics = [
    '#SpringBreak',
    '#PearsMVP',
    '#ASMRCooking',
    '#CodingLife',
    '#TravelPhotography'
  ];

  const refreshFeed = useCallback(() => {
    const loadedPosts = api.getPosts(currentUser?.UserID);
    setPosts(loadedPosts);
    if (currentUser) {
      setNotifications(api.getNotifications(currentUser.UserID));
      setFollowingIds(api.getFollowing(currentUser.UserID));
    } else {
      setNotifications([]);
      setFollowingIds([]);
    }
  }, [currentUser]);

  useEffect(() => {
    setAppsScriptConfig(api.getConfig());
    refreshFeed();
  }, [refreshFeed]);

  // Suggested accounts (exclude current user)
  const allUsers = api.getUsers();
  const suggestedAccounts = allUsers.filter(u => u.UserID !== currentUser?.UserID).slice(0, 5);

  // Filter posts based on activeTab, searchQuery, and selectedHashtag
  const filteredPosts = posts.filter(post => {
    // Hashtag filter
    if (selectedHashtag && !post.Caption.toLowerCase().includes(selectedHashtag.toLowerCase())) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCaption = post.Caption.toLowerCase().includes(q);
      const matchUser = post.user?.Username.toLowerCase().includes(q) || post.user?.Name.toLowerCase().includes(q);
      if (!matchCaption && !matchUser) return false;
    }

    // Tab filter
    if (activeTab === 'following') {
      return followingIds.includes(post.UserID) || post.UserID === currentUser?.UserID;
    }
    if (activeTab === 'trending') {
      return post.likesCount > 5000;
    }
    return true; // foryou & explore
  });

  const toggleLike = (postId: string) => {
    if (!currentUser) return;
    api.toggleLike(postId, currentUser.UserID);
    refreshFeed();
    if (activeCommentPost?.PostID === postId) {
      setActiveCommentPost(prev => prev ? { ...prev, likesCount: prev.likesCount + (prev.isLikedByMe ? -1 : 1), isLikedByMe: !prev.isLikedByMe } : null);
    }
  };

  const toggleBookmark = (postId: string) => {
    if (!currentUser) return;
    api.toggleBookmark(postId, currentUser.UserID);
    refreshFeed();
  };

  const toggleFollow = (targetUserId: string): boolean => {
    if (!currentUser) return false;
    const res = api.toggleFollow(currentUser.UserID, targetUserId);
    refreshFeed();
    return res;
  };

  const isFollowing = (targetUserId: string): boolean => {
    return followingIds.includes(targetUserId);
  };

  const addPost = (data: Omit<Post, 'PostID' | 'CreatedAt' | 'likesCount' | 'commentsCount'>): Post => {
    const newP = api.createPost(data);
    refreshFeed();
    return newP;
  };

  const addComment = (postId: string, text: string): Comment => {
    if (!currentUser) throw new Error('Not logged in');
    const cmt = api.addComment(postId, currentUser.UserID, text);
    refreshFeed();
    return cmt;
  };

  const getComments = (postId: string): Comment[] => {
    return api.getComments(postId);
  };

  const openShareModal = (url: string) => {
    setShareUrl(url);
    setShareModalOpen(true);
  };

  const updateAppsScriptConfig = (cfg: AppsScriptConfig) => {
    api.saveConfig(cfg);
    setAppsScriptConfig(cfg);
  };

  const resetAllData = () => {
    api.resetDatabase();
    refreshFeed();
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        filteredPosts,
        activeTab,
        setActiveTab,
        trendingTopics,
        suggestedAccounts,
        notifications,
        searchQuery,
        setSearchQuery,
        selectedHashtag,
        setSelectedHashtag,
        activeCommentPost,
        setActiveCommentPost,
        isUploadModalOpen,
        setUploadModalOpen,
        isShareModalOpen,
        setShareModalOpen,
        shareUrl,
        openShareModal,
        appsScriptConfig,
        updateAppsScriptConfig,
        refreshFeed,
        toggleLike,
        toggleBookmark,
        toggleFollow,
        isFollowing,
        addPost,
        addComment,
        getComments,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
