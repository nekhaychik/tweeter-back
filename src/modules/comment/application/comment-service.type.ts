export interface CreateCommentParameters {
  text?: string;
  files?: Express.Multer.File[];
  tweetId: string;
  userId: string;
}

export interface GetAllCommentsByTweetIdParameters {
  tweetId: string;
  limit?: number;
  offset?: number;
}

export interface UpdateCommentParameters {
  userId: string;
  commentId: string;
  text?: string;
  files?: Express.Multer.File[];
}

export interface DeleteCommentParameters {
  userId: string;
  commentId: string;
}
