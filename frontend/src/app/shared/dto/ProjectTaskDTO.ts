import {ProjectMemberDTO} from './ProjectMemberDTO';
import {ProjectDTO} from './ProjectDTO';
import {TaskStatus} from '../../layouts/admin-layout/submodules/project-module/subcomponents/project-board/project-board.component';

export class ProjectTaskDTO {

  public id: number;
  public name: string;
  public description: string;
  public projectMember: ProjectMemberDTO;
  public project: ProjectDTO;
  public taskStatus: TaskStatus;
  public createdDate: Date;
  public deadline: Date;
}
