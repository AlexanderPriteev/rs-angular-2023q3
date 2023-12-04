import { IGroupItem, IPeopleItem } from './items';

export interface IGroups {
  Count: number;
  Items: IGroupItem[];
}
export interface IPeoples {
  Count: number;
  Items: IPeopleItem[];
}

export interface IColumn {
  type: 'people' | 'group';
  items: IGroupItem[] | IPeopleItem[];
}
