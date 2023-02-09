export interface CreateSavedParameters {
  tweetId: string;
  userId: string;
}

export interface GetSavedParameters {
  tweetId: string;
  userId: string;
}

export interface CountTweetSavedParameters {
  tweetId: string;
}

export interface GetTweetSavedUsersParameters {
  tweetId: string;
}

export interface DeleteSavedParameters {
  tweetId: string;
  userId: string;
}
