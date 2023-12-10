export interface IStr {
  S: string;
}

export interface IGroupItem {
  id: IStr;
  name: IStr;
  createdAt: IStr;
  createdBy: IStr;
}

export interface IPeopleItem {
  name: IStr;
  uid: IStr;
}

export interface IItem {
  type: 'people' | 'group';
  item: IPeopleItem | IGroupItem;
}

export interface IGroupResponse {
  groupID: string;
}
