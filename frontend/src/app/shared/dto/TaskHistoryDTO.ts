import {TaskStatus} from '../../layouts/admin-layout/submodules/project-module/subcomponents/project-board/project-board.component';
import {ProjectMemberDTO} from './ProjectMemberDTO';
import {ProjectTaskDTO} from './ProjectTaskDTO';

export class TaskHistoryDTO {

  public id: number;

  public name: string;

  public description: string;

  public previousStatus: TaskStatus;

  public currentStatus: TaskStatus;

  public projectMember: ProjectMemberDTO;

  public projectTask: ProjectTaskDTO;

  public date: Date;
}
