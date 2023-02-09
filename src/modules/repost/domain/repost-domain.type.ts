export interface CreateRepostParameters {
  tweetId: string;
  userId: string;
}

export interface GetRepostParameters {
  tweetId: string;
  userId: string;
}

export interface CountTweetRepostsParameters {
  tweetId: string;
}

export interface GetTweetRepostUsersParameters {
  tweetId: string;
}

export interface DeleteRepostParameters {
  tweetId: string;
  userId: string;
}
