import {NgoDTO} from './NgoDTO';

export class ProjectDTO{
  public id:number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public ngo: NgoDTO;
  public facebookLink: string;
  public twitterLink: string;
  public linkedinLink: string;
  public logo: any;
}
