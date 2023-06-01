import {ProjectTaskDTO} from './ProjectTaskDTO';

export class TaskAttachmentDTO {

  public id: number;

  public name: string;

  public description: string;

  public extension: string;

  public file: any;

  public projectTask: ProjectTaskDTO;

  public contentType: string;
}
