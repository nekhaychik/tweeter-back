export interface CreateLikeParameters {
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

export interface DeleteLikeParameters {
  tweetId: string;
  userId: string;
}
