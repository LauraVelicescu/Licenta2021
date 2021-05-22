import {UserDTO} from './UserDTO';
import {NgoDTO} from './NgoDTO';

export class MemberDTO {
  public id;
  public user: UserDTO;
  public ngo: NgoDTO;
  public function: string;
}
