import { Request } from 'express';

export interface ValidateParameters {
  request: Request;
  payload: {
    email: string;
  };
}
