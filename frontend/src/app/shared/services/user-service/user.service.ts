import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {SecurityStorage} from '../../../security/SecurityStorage';
import {UserDTO} from '../../dto/UserDTO';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {MemberRequestDTO} from '../../dto/MemberRequestDTO';
import {RoleDTO} from '../../dto/RoleDTO';
import {MemberDTO} from '../../dto/MemberDTO';
import {UserRoleDTO} from '../../dto/UserRoleDTO';
import {UserDTOImage} from '../../dto/UserDTOImage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootURL = 'api/user'
  private updateURL = '/updateUser';
  private getURL = '/getUser';
  private getUserImageURL = '/getUser/image';
  private getUsersURL = '/findUsers'
  private getUsersCountURL = '/findUsers/count';
  private getAllRolesURL = '/roles'
  private deleteURL = '/delete';
  private blockURL = '/block';
  private uploadImageURL = '/uploadImage'
  private sendEmailURL = '/sendMassEmail'
  private applyURL = '/apply'
  private setRolesForMembersURL = '/roles/member'
  private getUserRoleByRoleURL = '/roles/usersRole/:roleId'
  private deleteUserRoleURL = '/roles/usersRole/:userRoleId'

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage) {
  }

  public update(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.updateURL,
      userInfo).pipe(map((result: UserDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public getUser() {
    return this.mainService.get(this.rootURL + this.getURL).pipe(map((result: UserDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }

  public getUserImage() {
    return this.mainService.get(this.rootURL + this.getUserImageURL).pipe(map((result: UserDTOImage) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }

  public updateProfilePicture(profilePicture: any) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL, profilePicture).pipe(map((result: UserDTOImage) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }


  public findUsers(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getUsersURL + queryString).pipe(map((result: UserDTO[]) => {
      return plainToClass(UserDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findRoles() {
    return this.mainService.get(this.rootURL + this.getAllRolesURL).pipe(map((result: RoleDTO[]) => {
      return plainToClass(RoleDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findUsersCount() {
    return this.mainService.get(this.rootURL + this.getUsersCountURL).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteUsers(users: UserDTO[]) {
    return this.mainService.post(this.rootURL + this.deleteURL, users).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public blockUsers(users: UserDTO[]) {
    return this.mainService.post(this.rootURL + this.blockURL, users).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public sendEmail(users: UserDTO[], emailSubject: string, emailBody: string) {
    return this.mainService.post(this.rootURL + this.sendEmailURL, {
      users,
      subject: emailSubject,
      body: emailBody
    }).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public apply(request: MemberRequestDTO) {
    return this.mainService.post(this.rootURL + this.applyURL,
      request
    ).pipe(map((result: MemberRequestDTO) => {
      return result;
    }), catchError((err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    })));
  }

  public setRolesForMember(role: RoleDTO, members: MemberDTO[] | UserDTO[], isMember: boolean) {
    let list: UserRoleDTO[] = [];
    members.forEach(m => {
      let userRole: UserRoleDTO = new UserRoleDTO();
      userRole.role = role;
      if(isMember) {
        userRole.user = m.user;
        userRole.ngo = m.ngo
      } else {
        userRole.user = m;
      }
      list.push(userRole);
    })
    return this.mainService.post(this.rootURL + this.setRolesForMembersURL,
      list).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public getUserRoleByRole(role: RoleDTO) {
    return this.mainService.get(this.rootURL + this.getUserRoleByRoleURL.replace(':roleId', role.id.toString())).pipe(map((result: UserRoleDTO[]) => {
      return plainToClass(UserRoleDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteUserRole(userRole: UserRoleDTO) {
    return this.mainService.delete(this.rootURL + this.deleteUserRoleURL.replace(':userRoleId', userRole.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

}
