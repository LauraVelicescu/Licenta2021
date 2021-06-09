import {NgoDTO} from './NgoDTO';

export class ProjectDTO{
  public id;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public ngo: NgoDTO;
}
