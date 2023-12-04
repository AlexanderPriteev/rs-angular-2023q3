interface IStr {
  S: string;
}

export interface IGroupItem {
  id: IStr;
  name: IStr;
  createdAt: IStr;
  createdBy: IStr;
}

export interface IPeopleItem {
  id: IStr;
  companionID: IStr;
}

export interface IItem {
  type: 'people' | 'group';
  item: IPeopleItem | IGroupItem;
}
