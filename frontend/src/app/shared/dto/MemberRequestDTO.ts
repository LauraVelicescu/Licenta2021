import {UserDTO} from './UserDTO';
import {NgoDTO} from './NgoDTO';
export enum MemberRequestStatus {
  PENDING,
  ACCEPTED,
  DECLINED
}
export class MemberRequestDTO {
  public id: number;
  public user: UserDTO;
  public ngo: NgoDTO;
  public status: MemberRequestStatus;
  public motivation: string;
}
