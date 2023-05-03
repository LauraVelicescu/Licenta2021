import {NgoDTO} from './NgoDTO';

export class OrganizationalComponentDTO {
  public id: number;
  public name: string;
  public description: string;
  public lead: boolean;
  public parentNgo: NgoDTO;
}
