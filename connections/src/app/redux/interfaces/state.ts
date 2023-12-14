import { IGroupItem, IPeopleItem } from './items';
import { IDialogState } from './message';
import { IProfileState } from './profile';

export interface AppState {
  profile: IProfileState;
  groups: IGroupItem[];
  people: IPeopleItem[];
  dialogs: IDialogState;
}
