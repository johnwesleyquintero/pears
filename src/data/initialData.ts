import { User, Post, Like, Comment, Following, Notification, Bookmark } from '../types';

export const INITIAL_USERS: User[] = [
  {
    UserID: 'user_wesley',
    GoogleID: 'gid_1029384756',
    Name: 'Wesley Pear',
    Username: 'wesley_pear',
    Avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    Bio: '🍐 Building Pears MVP | React + Apps Script + Sheets architecture enthusiast 🚀',
    JoinedAt: '2026-06-01T10:00:00Z'
  },
  {
    UserID: 'user_sarah',
    GoogleID: 'gid_9988776655',
    Name: 'Sarah Jenkins',
    Username: 'sarah_vibe',
    Avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    Bio: 'Chasing sunsets & minimalist architecture ✨ | Kyoto 🇯🇵',
    JoinedAt: '2026-05-15T14:30:00Z'
  },
  {
    UserID: 'user_alex',
    GoogleID: 'gid_5544332211',
    Name: 'Chef Alex Rivera',
    Username: 'alex_cooks',
    Avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    Bio: '15-minute recipes for busy creatives 🍳🥑 | New cookbook out now!',
    JoinedAt: '2026-05-20T09:15:00Z'
  },
  {
    UserID: 'user_cyber',
    GoogleID: 'gid_1122334455',
    Name: 'Kaito Tanaka',
    Username: 'cyber_pixel',
    Avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    Bio: 'Synthwave beats & retro mechanical keyboards 🕹️⚡',
    JoinedAt: '2026-06-10T18:45:00Z'
  },
  {
    UserID: 'user_maya',
    GoogleID: 'gid_6677889900',
    Name: 'Maya Lin',
    Username: 'maya_dance',
    Avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    Bio: 'Urban choreography & street fashion 💃🗽 #dancevibe',
    JoinedAt: '2026-06-05T12:00:00Z'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    PostID: 'post_101',
    UserID: 'user_sarah',
    MediaType: 'video',
    MediaURL: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ThumbnailURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    Caption: 'Golden hour hits different when you are exploring the mountains 🌄 Chasing the light! #nature #goldenhour #pears',
    Visibility: 'public',
    CreatedAt: '2026-06-25T16:20:00Z',
    likesCount: 342,
    commentsCount: 28
  },
  {
    PostID: 'post_102',
    UserID: 'user_alex',
    MediaType: 'image',
    MediaURL: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80',
    Caption: 'Crispy sourdough avocado toast with poached eggs & chili flakes 🌶️🍞 Drop a comment if you want the exact recipe macro sheet!',
    Visibility: 'public',
    CreatedAt: '2026-06-25T14:10:00Z',
    likesCount: 512,
    commentsCount: 45
  },
  {
    PostID: 'post_103',
    UserID: 'user_cyber',
    MediaType: 'gif',
    MediaURL: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW51eHRzZXg4aDJubndseGFsY2NnNG1leXBhZnR3b3JtcGR3aGxlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LpwBqCorPvZC0/giphy.gif',
    Caption: 'Late night debugging sessions fueled by synthwave & matcha lattes ☕💻 Who else is coding right now? #developer #cyberpunk #react',
    Visibility: 'public',
    CreatedAt: '2026-06-25T11:05:00Z',
    likesCount: 189,
    commentsCount: 19
  },
  {
    PostID: 'post_104',
    UserID: 'user_maya',
    MediaType: 'video',
    MediaURL: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    ThumbnailURL: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    Caption: 'Fast cars & road trip vibes across the desert coast 🏎️🔥 Tag your adventure buddy! #roadtrip #vibes #pearsvideo',
    Visibility: 'public',
    CreatedAt: '2026-06-24T21:40:00Z',
    likesCount: 890,
    commentsCount: 64
  },
  {
    PostID: 'post_105',
    UserID: 'user_wesley',
    MediaType: 'image',
    MediaURL: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    Caption: '🍐 Proud to share the initial architecture diagram of Pears! Frontend React Router decoupled from Google Sheets via REST API. Swipe to test instant modularity ✨ #buildinpublic #appsscript',
    Visibility: 'public',
    CreatedAt: '2026-06-24T18:00:00Z',
    likesCount: 1240,
    commentsCount: 112
  },
  {
    PostID: 'post_106',
    UserID: 'user_sarah',
    MediaType: 'image',
    MediaURL: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80',
    Caption: 'Peaceful morning reflections at the bamboo grove 🎋 Keep your mind as light as your apps.',
    Visibility: 'public',
    CreatedAt: '2026-06-23T08:30:00Z',
    likesCount: 430,
    commentsCount: 31
  }
];

export const INITIAL_LIKES: Like[] = [
  { LikeID: 'l_1', PostID: 'post_101', UserID: 'user_wesley', CreatedAt: '2026-06-25T16:25:00Z' },
  { LikeID: 'l_2', PostID: 'post_102', UserID: 'user_wesley', CreatedAt: '2026-06-25T14:15:00Z' },
  { LikeID: 'l_3', PostID: 'post_105', UserID: 'user_sarah', CreatedAt: '2026-06-24T18:10:00Z' },
  { LikeID: 'l_4', PostID: 'post_105', UserID: 'user_alex', CreatedAt: '2026-06-24T18:12:00Z' },
  { LikeID: 'l_5', PostID: 'post_104', UserID: 'user_wesley', CreatedAt: '2026-06-24T22:00:00Z' }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    CommentID: 'c_1',
    PostID: 'post_101',
    UserID: 'user_wesley',
    Comment: 'Incredible lighting Sarah! What camera profile did you use?',
    CreatedAt: '2026-06-25T16:30:00Z'
  },
  {
    CommentID: 'c_2',
    PostID: 'post_101',
    UserID: 'user_sarah',
    Comment: '@wesley_pear Shot on Sony A7IV with 35mm f/1.4 GM!',
    CreatedAt: '2026-06-25T16:35:00Z'
  },
  {
    CommentID: 'c_3',
    PostID: 'post_102',
    UserID: 'user_maya',
    Comment: 'This looks so delicious Alex 🤤 Making this for brunch tomorrow!',
    CreatedAt: '2026-06-25T15:00:00Z'
  },
  {
    CommentID: 'c_4',
    PostID: 'post_105',
    UserID: 'user_cyber',
    Comment: 'Decoupled storage providers is such a clean design principle. Love the Sheets backend concept!',
    CreatedAt: '2026-06-24T19:20:00Z'
  }
];

export const INITIAL_FOLLOWING: Following[] = [
  { UserID: 'user_wesley', FollowingID: 'user_sarah', CreatedAt: '2026-06-02T10:00:00Z' },
  { UserID: 'user_wesley', FollowingID: 'user_alex', CreatedAt: '2026-06-02T10:05:00Z' },
  { UserID: 'user_sarah', FollowingID: 'user_wesley', CreatedAt: '2026-06-03T11:00:00Z' },
  { UserID: 'user_cyber', FollowingID: 'user_wesley', CreatedAt: '2026-06-11T12:00:00Z' },
  { UserID: 'user_maya', FollowingID: 'user_wesley', CreatedAt: '2026-06-12T14:00:00Z' }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    NotificationID: 'n_1',
    UserID: 'user_wesley',
    SenderID: 'user_sarah',
    Type: 'like',
    ReferenceID: 'post_105',
    CreatedAt: '2026-06-24T18:10:00Z'
  },
  {
    NotificationID: 'n_2',
    UserID: 'user_wesley',
    SenderID: 'user_cyber',
    Type: 'comment',
    ReferenceID: 'post_105',
    CreatedAt: '2026-06-24T19:20:00Z'
  },
  {
    NotificationID: 'n_3',
    UserID: 'user_wesley',
    SenderID: 'user_maya',
    Type: 'follow',
    ReferenceID: 'user_maya',
    CreatedAt: '2026-06-12T14:00:00Z'
  }
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  { BookmarkID: 'bm_1', PostID: 'post_102', UserID: 'user_wesley', CreatedAt: '2026-06-25T14:20:00Z' },
  { BookmarkID: 'bm_2', PostID: 'post_104', UserID: 'user_wesley', CreatedAt: '2026-06-24T22:05:00Z' }
];

export const SAMPLE_APPS_SCRIPT_CODE = `/**
 * PEARS SOCIAL MEDIA - GOOGLE APPS SCRIPT BACKEND
 * Paste this code into your Google Apps Script project attached to a Google Sheet!
 * Deploy as Web App (Execute as: Me, Who has access: Anyone)
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  var payload = data.payload;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === "CREATE_POST") {
    var sheet = ss.getSheetByName("Posts") || ss.insertSheet("Posts");
    sheet.appendRow([
      payload.PostID, payload.UserID, payload.MediaType,
      payload.MediaURL, payload.ThumbnailURL || "", payload.Caption,
      payload.Visibility, new Date().toISOString()
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success", post: payload }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === "TOGGLE_LIKE") {
    var sheet = ss.getSheetByName("Likes") || ss.insertSheet("Likes");
    // Append or remove like logic here
    sheet.appendRow([payload.LikeID, payload.PostID, payload.UserID, new Date().toISOString()]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var action = e.parameter.action;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === "GET_FEED") {
    var sheet = ss.getSheetByName("Posts");
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({ posts: [] })).setMimeType(ContentService.MimeType.JSON);
    
    var values = sheet.getDataRange().getValues();
    var headers = values.shift();
    var posts = values.map(function(row) {
      var obj = {};
      headers.forEach(function(h, i) { obj[h] = row[i]; });
      return obj;
    }).reverse();
    
    return ContentService.createTextOutput(JSON.stringify({ posts: posts }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "Pears API Alive" }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
