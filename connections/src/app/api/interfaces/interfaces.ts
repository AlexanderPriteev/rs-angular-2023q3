export interface IAuth {
  token: string;
  uid: string;
}

export interface IHeader {
  'rs-uid': string;
  'rs-email': string;
  'Authorization': string;
}
