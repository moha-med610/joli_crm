import { ObjectId } from 'mongoose';

export type UserPayload = {
  id: string | ObjectId;
  email: string;
  role: number;
  tokenVersion: number;
};
