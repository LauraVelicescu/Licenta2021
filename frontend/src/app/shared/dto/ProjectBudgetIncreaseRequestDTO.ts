import {MemberDTO} from './MemberDTO';
import {ProjectBudgetIncreaseRequestStatus} from './ProjectBudgetIncreaseRequestStatus';
import {ProjectDTO} from './ProjectDTO';

export class ProjectBudgetIncreaseRequestDTO {
  public id: number;
  public name: string;
  public description: string;
  public amount: number;
  public requestOwner: MemberDTO;
  public motivation: string;
  public status: ProjectBudgetIncreaseRequestStatus;
  public project: ProjectDTO;
}
