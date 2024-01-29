export interface IAuth {
  token: string;
  uid: string;
}

export interface IHeader {
  'rs-uid': string;
  'rs-email': string;
  'Authorization': string;
}

export interface IGroupMessage {
  groupID: string;
  message: string;
}

export interface IPeopleMessage {
  conversationID: string;
  message: string;
}
