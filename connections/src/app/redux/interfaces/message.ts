import { IStr } from './items';

export interface IMessage {
  authorID: IStr;
  message: IStr;
  createdAt: IStr;
  authorName: string;
}

export interface IDialog {
  Count: number;
  Items: IMessage[];
  lastUpdate?: number;
}

export interface IDialogState {
  group: Map<string, IDialog>,
  people: Map<string, IDialog>
}
