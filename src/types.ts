export type MediaType = 'image' | 'video' | 'gif';
export type Visibility = 'public' | 'followers' | 'private';
export type NotificationType = 'like' | 'comment' | 'follow';

export interface User {
  UserID: string;
  GoogleID: string;
  Name: string;
  Username: string;
  Avatar: string;
  Bio: string;
  JoinedAt: string;
}

export interface Post {
  PostID: string;
  UserID: string;
  MediaType: MediaType;
  MediaURL: string;
  ThumbnailURL?: string;
  Caption: string;
  Visibility: Visibility;
  CreatedAt: string;
  // Computed / hydrated fields for UI convenience
  user?: User;
  likesCount: number;
  commentsCount: number;
  isLikedByMe?: boolean;
  isBookmarkedByMe?: boolean;
}

export interface Like {
  LikeID: string;
  PostID: string;
  UserID: string;
  CreatedAt: string;
}

export interface Comment {
  CommentID: string;
  PostID: string;
  UserID: string;
  Comment: string;
  CreatedAt: string;
  user?: User;
}

export interface Following {
  UserID: string;      // The follower
  FollowingID: string; // The creator being followed
  CreatedAt: string;
}

export interface Notification {
  NotificationID: string;
  UserID: string; // Recipient
  SenderID: string; // Actor
  Type: NotificationType;
  ReferenceID: string; // PostID or UserID
  CreatedAt: string;
  sender?: User;
  post?: Post;
}

export interface Bookmark {
  BookmarkID: string;
  PostID: string;
  UserID: string;
  CreatedAt: string;
}

export interface AppsScriptConfig {
  enabled: boolean;
  webAppUrl: string;
  apiKey?: string;
}
