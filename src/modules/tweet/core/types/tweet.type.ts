export interface TweetDto {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  isComment: boolean;
  text?: string;
  imagesURLs?: string;
  authorId: string;
  parentRecordAuthorId?: string;
  parentRecordId?: string;
}
