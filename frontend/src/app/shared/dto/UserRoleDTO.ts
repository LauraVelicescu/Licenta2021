import {UserDTO} from './UserDTO';
import {RoleDTO} from './RoleDTO';
import {NgoDTO} from './NgoDTO';

export class UserRoleDTO {
  public id: number
  public user: UserDTO;
  public role: RoleDTO;
  public ngo: NgoDTO
}
