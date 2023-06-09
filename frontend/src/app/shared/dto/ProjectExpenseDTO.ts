import {ProjectDTO} from './ProjectDTO';
import {ProjectTaskDTO} from './ProjectTaskDTO';
import {MemberDTO} from './MemberDTO';
import {ProjectMemberDTO} from './ProjectMemberDTO';
import {ProjectExpenseType} from './ProjectExpenseType';

export class ProjectExpenseDTO {
  public id: number;
  public name: string;
  public description: string;
  public amount: number;
  public project: ProjectDTO;
  public task: ProjectTaskDTO;
  public expenseOwner: ProjectMemberDTO;
  public documents: any;
  public projectExpenseType: ProjectExpenseType;
}
