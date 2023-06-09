import {NgoDTO} from './NgoDTO';

export class NgoYearDTO {

  public id: number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public treasury: number;
  public ngo: NgoDTO;
}
