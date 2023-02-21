export interface CreateParameters {
  tweetId: string;
  userId: string;
  text?: string;
  imagesURLs?: string[];
}

export interface GetByIdParameters {
  _id: string;
}

export interface GetAllByTweetIdParameters {
  limit?: number;
  offset?: number;
  tweetId: string;
}

export interface UpdateParameters {
  _id: string;
  text?: string;
  imagesURLs?: string[];
}

export interface DeleteParameters {
  _id: string;
}
