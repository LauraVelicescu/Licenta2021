import {UserDTO} from './UserDTO';
import {NgoDTO} from './NgoDTO';
import {FunctionDTO} from './FunctionDTO';

export class MemberDTO {
  public id;
  public user: UserDTO;
  public ngo: NgoDTO;
  public function: FunctionDTO;
}
