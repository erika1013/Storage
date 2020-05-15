export interface User {
  uid: string;
  email: string;
  //name:string;
  displayName: string;
  emailVerified: boolean;
  password?: string;
}
