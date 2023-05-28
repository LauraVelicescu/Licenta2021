import {NgoDTO} from './NgoDTO';

export class ProjectDTO{
  public id:number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public ngo: NgoDTO;
}
