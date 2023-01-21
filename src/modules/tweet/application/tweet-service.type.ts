export interface CreateTweetParameters {
  isComment: boolean;
  text?: string;
  imagesURLs?: string[];
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

export interface UpdateTweetParameters {
  userId: string;
  tweetId: string;
}

export interface DeleteTweetParameters {
  userId: string;
  tweetId: string;
}
