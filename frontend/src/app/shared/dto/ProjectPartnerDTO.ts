import {ProjectDTO} from './ProjectDTO';
import {PartnerDTO} from './PartnerDTO';
import {NgoPartnersTypeDTO} from './NgoPartnersTypeDTO';

export class ProjectPartnerDTO {
  public id: number;
  public name: string;
  public project: ProjectDTO;
  public partner: PartnerDTO;
  public partnersType: NgoPartnersTypeDTO;
  public amount: number;
}
