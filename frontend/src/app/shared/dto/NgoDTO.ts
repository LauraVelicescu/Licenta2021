import {OrganizationalComponentDTO} from './OrganizationalComponentDTO';

export class NgoDTO {
  public id: number;
  public name: string;
  public acronym: string;
  public foundingDate: Date;
  public description: string;
  public facebookLink: string;
  public twitterLink: string;
  public linkedinLink: string;
  public logo: any;
  public adminId: number;
  public createdDate: Date;
  public componentList: OrganizationalComponentDTO[];
}
