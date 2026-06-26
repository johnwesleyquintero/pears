import { User, Post, Like, Comment, Following, Notification, Bookmark, AppsScriptConfig } from '../types';

// Default initial sample users matching the Vibrant Palette theme design
const INITIAL_USERS: User[] = [
  {
    UserID: 'usr_maya',
    GoogleID: 'gid_maya',
    Name: 'Maya Lin',
    Username: 'maya_travels',
    Avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    Bio: 'Chasing sunsets & espresso shots ☕️✈️ Positano next!',
    JoinedAt: '2024-01-15T10:00:00Z'
  },
  {
    UserID: 'usr_sarah',
    GoogleID: 'gid_sarah',
    Name: 'Sarah Jenkins',
    Username: 'sarah_j',
    Avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    Bio: 'UI/UX Designer & plant mom 🌱 Sharing daily design tips.',
    JoinedAt: '2024-02-01T12:00:00Z'
  },
  {
    UserID: 'usr_pixel',
    GoogleID: 'gid_pixel',
    Name: '8-Bit Enthusiast',
    Username: 'pixel_art',
    Avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    Bio: 'Retro games & pixel animations 👾 Made with love.',
    JoinedAt: '2024-02-10T08:30:00Z'
  },
  {
    UserID: 'usr_nico',
    GoogleID: 'gid_nico',
    Name: 'Nico Rossi',
    Username: 'chef_nico',
    Avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    Bio: 'Italian pasta craftsman 🍝 ASMR cooking & recipe drops.',
    JoinedAt: '2024-01-20T14:15:00Z'
  },
  {
    UserID: 'usr_creative',
    GoogleID: 'gid_creative',
    Name: 'Creative Hub',
    Username: 'creative_hub',
    Avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    Bio: 'Curated modern art & photography community 🎨 Tag #SpringBreak',
    JoinedAt: '2024-01-05T09:00:00Z'
  },
  {
    UserID: 'usr_tom',
    GoogleID: 'gid_tom',
    Name: 'Tom Hollander',
    Username: 'dev_tom',
    Avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    Bio: 'React & CSS Wizard ⚡️ Building lightweight MVPs.',
    JoinedAt: '2024-03-01T11:20:00Z'
  }
];

const INITIAL_POSTS: Post[] = [
  {
    PostID: 'post_1',
    UserID: 'usr_maya',
    MediaType: 'video',
    MediaURL: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ThumbnailURL: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80',
    Caption: 'Sunset in Positano 🇮🇹 Unbelievable coastal vibes and crystal clear waters! #italy #sunset #vibes #SpringBreak',
    Visibility: 'public',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likesCount: 12400,
    commentsCount: 842
  },
  {
    PostID: 'post_2',
    UserID: 'usr_nico',
    MediaType: 'video',
    MediaURL: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    ThumbnailURL: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    Caption: 'Handmade Truffle Tagliatelle ASMR 🍝 Watch till the end for the Parmesan crisp! #ASMRCooking #Foodie #PearsMVP',
    Visibility: 'public',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likesCount: 8930,
    commentsCount: 312
  },
  {
    PostID: 'post_3',
    UserID: 'usr_sarah',
    MediaType: 'image',
    MediaURL: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    Caption: 'Minimalist desk setup breakdown 🖥️ Lime accents make all the difference when coding deep into the night. #CodingLife #Design #Minimal',
    Visibility: 'public',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    likesCount: 4520,
    commentsCount: 189
  },
  {
    PostID: 'post_4',
    UserID: 'usr_pixel',
    MediaType: 'gif',
    MediaURL: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWcwbjM0eDExODg1ZXAwa3R2MzdleDNhNW13Y3NtbWkxbWNocTlhciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L8K62iTDkzGX6/giphy.gif',
    Caption: 'When your React + Apps Script architecture compiles cleanly on the first try 🚀 Let\'s go! #PearsMVP #CodingLife #GIF',
    Visibility: 'public',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    likesCount: 15800,
    commentsCount: 1024
  },
  {
    PostID: 'post_5',
    UserID: 'usr_creative',
    MediaType: 'image',
    MediaURL: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&auto=format&fit=crop&q=80',
    Caption: 'Lost in the fog of the Pacific Northwest 🌲 Nature’s palette never disappoints. #TravelPhotography #SpringBreak #Explore',
    Visibility: 'public',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    likesCount: 21300,
    commentsCount: 560
  }
];

const INITIAL_COMMENTS: Comment[] = [
  {
    CommentID: 'cmt_1',
    PostID: 'post_1',
    UserID: 'usr_sarah',
    Comment: 'The colors in this video are insane! Adding Positano to my bucket list 🔥',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
  },
  {
    CommentID: 'cmt_2',
    PostID: 'post_1',
    UserID: 'usr_tom',
    Comment: 'Smooth playback! Loving the mobile TikTok interface on Pears 🍐',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    CommentID: 'cmt_3',
    PostID: 'post_2',
    UserID: 'usr_maya',
    Comment: 'Please drop the exact recipe Nico!! 🍝🤤',
    CreatedAt: new Date(Date.now() - 1000 * 60 * 100).toISOString()
  }
];

const STORAGE_KEYS = {
  USERS: 'pears_sheets_users',
  POSTS: 'pears_sheets_posts',
  LIKES: 'pears_sheets_likes',
  COMMENTS: 'pears_sheets_comments',
  FOLLOWING: 'pears_sheets_following',
  NOTIFICATIONS: 'pears_sheets_notifications',
  BOOKMARKS: 'pears_sheets_bookmarks',
  CONFIG: 'pears_apps_script_config'
};

class SheetsApiService {
  private getStorage<T>(key: string, defaultVal: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  private setStorage<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Failed saving to storage key ${key}`, e);
    }
  }

  // Initialize DB if empty
  public initDatabase(): void {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.setStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      this.setStorage(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      this.setStorage(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIKES)) {
      this.setStorage(STORAGE_KEYS.LIKES, [
        { LikeID: 'lk_1', PostID: 'post_1', UserID: 'usr_sarah', CreatedAt: new Date().toISOString() },
        { LikeID: 'lk_2', PostID: 'post_1', UserID: 'usr_tom', CreatedAt: new Date().toISOString() }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FOLLOWING)) {
      this.setStorage(STORAGE_KEYS.FOLLOWING, [
        { UserID: 'usr_sarah', FollowingID: 'usr_maya', CreatedAt: new Date().toISOString() },
        { UserID: 'usr_tom', FollowingID: 'usr_maya', CreatedAt: new Date().toISOString() }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.setStorage(STORAGE_KEYS.NOTIFICATIONS, [
        {
          NotificationID: 'notif_1',
          UserID: 'usr_maya',
          SenderID: 'usr_sarah',
          Type: 'like',
          ReferenceID: 'post_1',
          CreatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
        },
        {
          NotificationID: 'notif_2',
          UserID: 'usr_maya',
          SenderID: 'usr_sarah',
          Type: 'comment',
          ReferenceID: 'post_1',
          CreatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
        },
        {
          NotificationID: 'notif_3',
          UserID: 'usr_maya',
          SenderID: 'usr_tom',
          Type: 'follow',
          ReferenceID: 'usr_maya',
          CreatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString()
        }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      this.setStorage(STORAGE_KEYS.BOOKMARKS, []);
    }
  }

  // Configuration
  public getConfig(): AppsScriptConfig {
    return this.getStorage<AppsScriptConfig>(STORAGE_KEYS.CONFIG, {
      enabled: false,
      webAppUrl: 'https://script.google.com/macros/s/AKfycb.../exec'
    });
  }

  public saveConfig(config: AppsScriptConfig): void {
    this.setStorage(STORAGE_KEYS.CONFIG, config);
  }

  // Users
  public getUsers(): User[] {
    this.initDatabase();
    return this.getStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  public getUserById(userId: string): User | undefined {
    return this.getUsers().find(u => u.UserID === userId);
  }

  public getUserByUsername(username: string): User | undefined {
    return this.getUsers().find(u => u.Username.toLowerCase() === username.toLowerCase());
  }

  public saveUser(user: User): User {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.UserID === user.UserID);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.unshift(user);
    }
    this.setStorage(STORAGE_KEYS.USERS, users);
    return user;
  }

  // Posts
  public getPosts(currentUserId?: string): Post[] {
    this.initDatabase();
    const rawPosts = this.getStorage<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const users = this.getUsers();
    const likes = this.getStorage<Like[]>(STORAGE_KEYS.LIKES, []);
    const comments = this.getStorage<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const bookmarks = this.getStorage<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);

    // Hydrate posts with user and counts
    return rawPosts.map(p => {
      const user = users.find(u => u.UserID === p.UserID);
      const postLikes = likes.filter(l => l.PostID === p.PostID);
      const postComments = comments.filter(c => c.PostID === p.PostID);
      const isLiked = currentUserId ? postLikes.some(l => l.UserID === currentUserId) : false;
      const isBookmarked = currentUserId ? bookmarks.some(b => b.PostID === p.PostID && b.UserID === currentUserId) : false;

      return {
        ...p,
        user,
        likesCount: Math.max(p.likesCount || 0, postLikes.length),
        commentsCount: Math.max(p.commentsCount || 0, postComments.length),
        isLikedByMe: isLiked,
        isBookmarkedByMe: isBookmarked
      };
    }).sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
  }

  public createPost(post: Omit<Post, 'PostID' | 'CreatedAt' | 'likesCount' | 'commentsCount'>): Post {
    const rawPosts = this.getStorage<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const newPost: Post = {
      ...post,
      PostID: `post_${Date.now()}`,
      CreatedAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0
    };
    rawPosts.unshift(newPost);
    this.setStorage(STORAGE_KEYS.POSTS, rawPosts);
    return this.getPosts(post.UserID).find(p => p.PostID === newPost.PostID)!;
  }

  // Likes
  public toggleLike(postId: string, userId: string): boolean {
    const likes = this.getStorage<Like[]>(STORAGE_KEYS.LIKES, []);
    const existingIdx = likes.findIndex(l => l.PostID === postId && l.UserID === userId);
    let isLiked = false;

    if (existingIdx >= 0) {
      likes.splice(existingIdx, 1);
      isLiked = false;
    } else {
      likes.push({
        LikeID: `lk_${Date.now()}`,
        PostID: postId,
        UserID: userId,
        CreatedAt: new Date().toISOString()
      });
      isLiked = true;

      // Create notification if liking someone else's post
      const posts = this.getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
      const post = posts.find(p => p.PostID === postId);
      if (post && post.UserID !== userId) {
        this.addNotification({
          UserID: post.UserID,
          SenderID: userId,
          Type: 'like',
          ReferenceID: postId
        });
      }
    }

    this.setStorage(STORAGE_KEYS.LIKES, likes);

    // Update base post likesCount
    const posts = this.getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    const pIdx = posts.findIndex(p => p.PostID === postId);
    if (pIdx >= 0) {
      const postLikes = likes.filter(l => l.PostID === postId);
      posts[pIdx].likesCount = postLikes.length;
      this.setStorage(STORAGE_KEYS.POSTS, posts);
    }

    return isLiked;
  }

  // Bookmarks
  public toggleBookmark(postId: string, userId: string): boolean {
    const bookmarks = this.getStorage<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
    const existingIdx = bookmarks.findIndex(b => b.PostID === postId && b.UserID === userId);
    let isBookmarked = false;

    if (existingIdx >= 0) {
      bookmarks.splice(existingIdx, 1);
      isBookmarked = false;
    } else {
      bookmarks.push({
        BookmarkID: `bm_${Date.now()}`,
        PostID: postId,
        UserID: userId,
        CreatedAt: new Date().toISOString()
      });
      isBookmarked = true;
    }
    this.setStorage(STORAGE_KEYS.BOOKMARKS, bookmarks);
    return isBookmarked;
  }

  // Comments
  public getComments(postId: string): Comment[] {
    this.initDatabase();
    const comments = this.getStorage<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const users = this.getUsers();

    return comments
      .filter(c => c.PostID === postId)
      .map(c => ({
        ...c,
        user: users.find(u => u.UserID === c.UserID)
      }))
      .sort((a, b) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime());
  }

  public addComment(postId: string, userId: string, commentText: string): Comment {
    const comments = this.getStorage<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const newCmt: Comment = {
      CommentID: `cmt_${Date.now()}`,
      PostID: postId,
      UserID: userId,
      Comment: commentText,
      CreatedAt: new Date().toISOString()
    };
    comments.push(newCmt);
    this.setStorage(STORAGE_KEYS.COMMENTS, comments);

    // Update post comments count
    const posts = this.getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    const pIdx = posts.findIndex(p => p.PostID === postId);
    if (pIdx >= 0) {
      posts[pIdx].commentsCount = (posts[pIdx].commentsCount || 0) + 1;
      this.setStorage(STORAGE_KEYS.POSTS, posts);
    }

    // Notification
    const post = posts.find(p => p.PostID === postId);
    if (post && post.UserID !== userId) {
      this.addNotification({
        UserID: post.UserID,
        SenderID: userId,
        Type: 'comment',
        ReferenceID: postId
      });
    }

    const user = this.getUserById(userId);
    return { ...newCmt, user };
  }

  // Following
  public getFollowing(userId: string): string[] {
    const following = this.getStorage<Following[]>(STORAGE_KEYS.FOLLOWING, []);
    return following.filter(f => f.UserID === userId).map(f => f.FollowingID);
  }

  public getFollowers(targetUserId: string): string[] {
    const following = this.getStorage<Following[]>(STORAGE_KEYS.FOLLOWING, []);
    return following.filter(f => f.FollowingID === targetUserId).map(f => f.UserID);
  }

  public toggleFollow(followerId: string, targetUserId: string): boolean {
    const following = this.getStorage<Following[]>(STORAGE_KEYS.FOLLOWING, []);
    const idx = following.findIndex(f => f.UserID === followerId && f.FollowingID === targetUserId);

    if (idx >= 0) {
      following.splice(idx, 1);
      this.setStorage(STORAGE_KEYS.FOLLOWING, following);
      return false;
    } else {
      following.push({
        UserID: followerId,
        FollowingID: targetUserId,
        CreatedAt: new Date().toISOString()
      });
      this.setStorage(STORAGE_KEYS.FOLLOWING, following);

      this.addNotification({
        UserID: targetUserId,
        SenderID: followerId,
        Type: 'follow',
        ReferenceID: followerId
      });
      return true;
    }
  }

  // Notifications
  public getNotifications(userId: string): Notification[] {
    this.initDatabase();
    const notifs = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const users = this.getUsers();
    const posts = this.getPosts(userId);

    return notifs
      .filter(n => n.UserID === userId && n.SenderID !== userId)
      .map(n => ({
        ...n,
        sender: users.find(u => u.UserID === n.SenderID),
        post: n.ReferenceID.startsWith('post_') ? posts.find(p => p.PostID === n.ReferenceID) : undefined
      }))
      .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
  }

  private addNotification(data: Omit<Notification, 'NotificationID' | 'CreatedAt'>): void {
    const notifs = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    notifs.unshift({
      ...data,
      NotificationID: `notif_${Date.now()}`,
      CreatedAt: new Date().toISOString()
    });
    this.setStorage(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  // Reset database to initial mock
  public resetDatabase(): void {
    localStorage.clear();
    this.initDatabase();
  }

  // Export full Sheets JSON representation (for Google Sheets sync verify)
  public exportSheetsSnapshot() {
    return {
      Users: this.getStorage(STORAGE_KEYS.USERS, []),
      Posts: this.getStorage(STORAGE_KEYS.POSTS, []),
      Likes: this.getStorage(STORAGE_KEYS.LIKES, []),
      Comments: this.getStorage(STORAGE_KEYS.COMMENTS, []),
      Following: this.getStorage(STORAGE_KEYS.FOLLOWING, []),
      Notifications: this.getStorage(STORAGE_KEYS.NOTIFICATIONS, [])
    };
  }
}

export const api = new SheetsApiService();
