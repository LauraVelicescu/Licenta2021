export class UserDTO {
  public id: number;
  public emailAddress: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public birthday: Date;
  public aboutMe: string;
  public facebookLink: string;
  public twitterLink: string;
  public linkedinLink: string;
  public profilePicture: any;
  public blocked: boolean;
  public failAttempts: number;
}
