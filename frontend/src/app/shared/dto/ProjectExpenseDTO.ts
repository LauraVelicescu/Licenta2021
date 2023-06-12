import {ProjectDTO} from './ProjectDTO';
import {ProjectTaskDTO} from './ProjectTaskDTO';
import {ProjectMemberDTO} from './ProjectMemberDTO';

export class ProjectExpenseDTO {
  public id: number;
  public name: string;
  public description: string;
  public amount: number;
  public project: ProjectDTO;
  public task: ProjectTaskDTO;
  public expenseOwner: ProjectMemberDTO;
  public status: number;
  public date: Date;
  public fileName: string;
  public fileExtension: string;
  contentType: string;
}
