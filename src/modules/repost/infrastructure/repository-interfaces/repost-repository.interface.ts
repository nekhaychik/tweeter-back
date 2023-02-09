export interface CreateParameters {
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

export interface DeleteParameters {
  tweetId: string;
  userId: string;
}
