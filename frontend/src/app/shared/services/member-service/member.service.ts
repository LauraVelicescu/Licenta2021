import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {NgoDTO} from '../../dto/NgoDTO';
import {UserDTO} from '../../dto/UserDTO';
import {MemberDTO} from '../../dto/MemberDTO';
import {catchError, map} from 'rxjs/operators';
import {FunctionDTO} from '../../dto/FunctionDTO';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private rootURL = 'api/member'
  private updateMemberURL = '/:id';
  private getNGOMembersURL = '/ngo/:ngoId';
  private getNGOMembersCountURL = '/ngo/count/:ngoId';
  private assignMemberToNGOURL = '/addMembers';
  private deleteByIdsURL = '/ids';

  constructor(private mainService: MainServiceService) {
  }

  public addNgoMembers(ngo: NgoDTO, members: UserDTO[]) {
    let ngoMembers: MemberDTO[] = [];
    members.forEach(e => {
      let ngoMember: MemberDTO = new MemberDTO();
      ngoMember.user = e;
      ngoMember.ngo = ngo;
      ngoMembers.push(ngoMember);
    })
    return this.mainService.post(this.rootURL + this.assignMemberToNGOURL, ngoMembers).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public getNGOMembers(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getNGOMembersURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: MemberDTO[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public getNGOMembersCount(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getNGOMembersCountURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public updateMember(member: MemberDTO) {
    return this.mainService.put(this.rootURL + this.updateMemberURL.replace(':id', member.id), member).pipe(map((result: MemberDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }


  public delete(members: MemberDTO[]) {
    let ids = '?ids=';
    members.forEach(e => {
      ids += e.id + ','
    });
    ids = ids.substring(0, ids.length - 1)
    return this.mainService.delete(this.rootURL + this.deleteByIdsURL + ids).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }


}
