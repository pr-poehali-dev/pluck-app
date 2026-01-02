export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  collections: number;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  sourceUrl?: string;
  description: string;
  content: string;
  author: string;
  authorId?: string;
  date: string;
  readTime: number;
  tags: string[];
  saved: boolean;
  imageUrl?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  author: User;
  articles: Article[];
  articlesCount: number;
  likes: number;
  isLiked: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface ReadingGoal {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly';
  targetMinutes: number;
  currentMinutes: number;
  startDate: string;
  endDate: string;
}

export interface ReadingSession {
  id: string;
  userId: string;
  articleId: string;
  startTime: string;
  endTime: string;
  duration: number;
  progress: number;
}

export interface RSSSource {
  id: string;
  name: string;
  url: string;
  category: string;
  icon?: string;
  enabled: boolean;
  addedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email'
  },
  USERS: {
    GET_PROFILE: '/api/users/:userId',
    UPDATE_PROFILE: '/api/users/:userId',
    FOLLOW: '/api/users/:userId/follow',
    UNFOLLOW: '/api/users/:userId/unfollow',
    GET_FOLLOWERS: '/api/users/:userId/followers',
    GET_FOLLOWING: '/api/users/:userId/following'
  },
  ARTICLES: {
    GET_FEED: '/api/articles/feed',
    GET_BY_ID: '/api/articles/:articleId',
    SAVE: '/api/articles/:articleId/save',
    UNSAVE: '/api/articles/:articleId/unsave',
    GET_SAVED: '/api/articles/saved',
    TRACK_READING: '/api/articles/:articleId/track'
  },
  COLLECTIONS: {
    GET_ALL: '/api/collections',
    GET_BY_ID: '/api/collections/:collectionId',
    CREATE: '/api/collections',
    UPDATE: '/api/collections/:collectionId',
    DELETE: '/api/collections/:collectionId',
    LIKE: '/api/collections/:collectionId/like',
    UNLIKE: '/api/collections/:collectionId/unlike',
    ADD_ARTICLE: '/api/collections/:collectionId/articles',
    REMOVE_ARTICLE: '/api/collections/:collectionId/articles/:articleId'
  },
  COMMENTS: {
    GET_BY_COLLECTION: '/api/collections/:collectionId/comments',
    CREATE: '/api/collections/:collectionId/comments',
    UPDATE: '/api/comments/:commentId',
    DELETE: '/api/comments/:commentId',
    LIKE: '/api/comments/:commentId/like',
    UNLIKE: '/api/comments/:commentId/unlike'
  },
  GOALS: {
    GET: '/api/goals',
    CREATE: '/api/goals',
    UPDATE: '/api/goals/:goalId',
    DELETE: '/api/goals/:goalId',
    GET_PROGRESS: '/api/goals/progress'
  },
  SOURCES: {
    GET_ALL: '/api/sources',
    ADD: '/api/sources',
    UPDATE: '/api/sources/:sourceId',
    DELETE: '/api/sources/:sourceId',
    TOGGLE: '/api/sources/:sourceId/toggle'
  },
  SUBSCRIPTION: {
    GET_STATUS: '/api/subscription/status',
    CREATE: '/api/subscription/create',
    CANCEL: '/api/subscription/cancel'
  }
} as const;
