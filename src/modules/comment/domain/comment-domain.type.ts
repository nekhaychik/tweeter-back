export interface CreateCommentParameters {
  tweetId: string;
  userId: string;
  text?: string;
  imagesURLs?: string[];
}

export interface GetCommentByIdParameters {
  commentId: string;
}

export interface GetAllCommentsByTweetIdParameters {
  tweetId: string;
  limit?: number;
  offset?: number;
}

export interface UpdateCommentParameters {
  commentId: string;
  text?: string;
  imagesURLs?: string[];
}

export interface DeleteCommentParameters {
  commentId: string;
}
