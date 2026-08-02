import { ObjectId } from 'mongoose';

export type UserPayload = {
  id: string | ObjectId;
  email: string;
  role: number;
  tokenVersion: number;
};

export type JWTPayload = {
  id: string | ObjectId;
  email: string;
  role: number;
  tokenVersion: number;
  iat: number;
  exp: number;
  jti: string;
};
