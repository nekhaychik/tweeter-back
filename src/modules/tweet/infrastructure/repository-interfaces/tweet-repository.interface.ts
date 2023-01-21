export interface createParameters {
  isComment: boolean;
  text?: string;
  imagesURLs?: string[];
  authorId: string;
  parentRecordAuthorId?: string;
  parentRecordId?: string;
}

export interface GetByRecordIdParameters {
  _id: string;
}

export interface GetAllByAuthorIdParameters {
  authorId: string;
}

export interface UpdateParameters {
  _id: string;
  isComment?: boolean;
  text?: string;
  imagesURLs?: string[];
}

export interface DeleteParameters {
  _id: string;
}
