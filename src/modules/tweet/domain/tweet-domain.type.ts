export interface CreateTweetParameters {
  isComment: boolean;
  text?: string;
  imagesURLs?: string[];
  authorId: string;
  parentRecordAuthorId?: string;
  parentRecordId?: string;
}

export interface GetTweetByRecordIdParameters {
  tweetId: string;
}

export interface GetAllUserRecordsParameters {
  authorId: string;
}

export interface UpdateTweetParameters {
  tweetId: string;
  isComment?: boolean;
  text?: string;
  imagesURLs?: string[];
}

export interface DeleteTweetParameters {
  tweetId: string;
}
