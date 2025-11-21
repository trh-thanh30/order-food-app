import { EntityID } from './common';

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: EntityID;
  name: string;
  email: string;
  avatarUrl?: string;
  token: string;
}

export interface IAuthResult {
  user: IAuthUser;
  token: string;
}

