import {ProjectDTO} from './ProjectDTO';
import {MemberDTO} from './MemberDTO';
import {ProjectPositionDTO} from './ProjectPositionDTO';

export class ProjectMemberDTO {

  public id: number;
  public description: string;
  public project: ProjectDTO;
  public member: MemberDTO;
  public projectPosition: ProjectPositionDTO;
  public since: Date;
}
