import {NgoYearDTO} from './NgoYearDTO';

export class ProjectDTO{
  public id:number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public ngoYear: NgoYearDTO;
  public facebookLink: string;
  public twitterLink: string;
  public linkedinLink: string;
  public logo: any;
  public budgetTreasury: number;
  public budgetPartners: number;
}
