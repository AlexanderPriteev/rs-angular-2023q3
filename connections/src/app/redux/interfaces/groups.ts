import { IGroupItem, IPeopleItem } from './items';

export interface IGroups {
  Count: number;
  Items: IGroupItem[];
}
export interface IPeople {
  Count: number;
  Items: IPeopleItem[];
}

export interface IColumn {
  type: 'people' | 'group';
  items: IGroupItem[] | IPeopleItem[];
}
