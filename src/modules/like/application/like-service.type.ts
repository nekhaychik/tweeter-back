export interface CreateLikeParameters {
  tweetId: string;
  userId: string;
}

export interface GetLikeParameters {
  tweetId: string;
  userId: string;
}

export interface GetAmountOfTweetLikesParameters {
  tweetId: string;
}

export interface GetUsersLikedTweetParameters {
  tweetId: string;
}

export interface DeleteLikeParameters {
  tweetId: string;
  userId: string;
}
