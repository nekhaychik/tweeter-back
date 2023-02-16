export interface CreateParameters {
  tweetId: string;
  userId: string;
}

export interface GetSavedParameters {
  tweetId: string;
  userId: string;
}

export interface GetAllSavedByUserIdParameters {
  userId: string;
}

export interface CountTweetSavedParameters {
  tweetId: string;
}

export interface GetTweetSavedUsersParameters {
  tweetId: string;
}

export interface DeleteParameters {
  tweetId: string;
  userId: string;
}
