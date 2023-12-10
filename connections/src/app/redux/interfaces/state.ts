import { IProfileState } from './profile';
import {IGroupItem, IPeopleItem} from "./items";

export interface AppState {
  profile: IProfileState;
  groups: IGroupItem[];
  people: IPeopleItem[];
}
