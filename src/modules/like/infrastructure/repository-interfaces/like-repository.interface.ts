export interface CreateParameters {
  tweetId: string;
  userId: string;
}

export interface GetLikeParameters {
  tweetId: string;
  userId: string;
}

export interface CountTweetLikesParameters {
  tweetId: string;
}

export interface GetTweetLikeUsersParameters {
  tweetId: string;
}

export interface DeleteParameters {
  tweetId: string;
  userId: string;
}
