export interface CreateRepostParameters {
  tweetId: string;
  userId: string;
}

export interface GetRepostParameters {
  tweetId: string;
  userId: string;
}

export interface GetAmountOfTweetRepostsParameters {
  tweetId: string;
}

export interface GetUsersRepostedTweetParameters {
  tweetId: string;
}

export interface DeleteRepostParameters {
  tweetId: string;
  userId: string;
}
