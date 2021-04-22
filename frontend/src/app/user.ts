export interface User {
  id: number;
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  aboutMe: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  profilePicture: any;
  blocked: boolean;
  failAttempts: number;
}
