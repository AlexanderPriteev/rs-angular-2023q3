import { IStr } from './items';

export interface IProfile {
  email: IStr;
  name: IStr;
  uid: IStr;
  createdAt: IStr;
}

export interface IProfileState {
  email: string;
  name: string;
  uid: string;
  createdAt: string;
}
