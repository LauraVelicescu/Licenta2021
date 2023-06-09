import {NgoDTO} from './NgoDTO';

export class NgoPartnersTypeDTO {

  public id: number;
  public name: string;
  public description: string;
  public minAmount: string;
  public maxAmount: string;
  public ngo: NgoDTO;
}
