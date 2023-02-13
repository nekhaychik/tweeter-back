export interface CreateTweetParameters {
  isComment: boolean;
  text?: string;
  files?: Array<Express.Multer.File>;
  userId: string;
}

export interface RepostTweetParameters {
  tweetId: string;
  userId: string;
}

export interface GetTweetByIdParameters {
  tweetId: string;
}

export interface GetAllUserTweetsParameters {
  userId: string;
}

export interface GetAllTweetsParameters {
  offset?: string;
  limit?: string;
  keyword?: string;
}

export interface UpdateTweetParameters {
  userId: string;
  tweetId: string;
  text?: string;
  isComment?: boolean;
}

export interface DeleteTweetParameters {
  userId: string;
  tweetId: string;
}
