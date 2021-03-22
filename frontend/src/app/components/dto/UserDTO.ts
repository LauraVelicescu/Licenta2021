export class UserDTO {
  public id: number;
  public emailAddress: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public birthday: Date;
  public blocked: boolean;
  public failAttempts: number;
}
