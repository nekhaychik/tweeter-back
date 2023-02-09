export interface CreateSavedParameters {
  tweetId: string;
  userId: string;
}

export interface GetSavedParameters {
  tweetId: string;
  userId: string;
}

export interface GetAmountOfTweetSavedParameters {
  tweetId: string;
}

export interface GetUsersSavedTweetParameters {
  tweetId: string;
}

export interface DeleteSavedParameters {
  tweetId: string;
  userId: string;
}
