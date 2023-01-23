export interface Tweet {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isComment: boolean;
  text?: string;
  imagesURLs?: string;
  authorId: string;
  parentRecordAuthorId?: string;
  parentRecordId?: string;
}
