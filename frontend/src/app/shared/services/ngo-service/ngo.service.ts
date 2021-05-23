import {Injectable} from '@angular/core';
import {NgoDTO} from '../../dto/NgoDTO';
import {MainServiceService} from '../main/main-service.service';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {UserDTO} from '../../dto/UserDTO';
import {MemberDTO} from '../../dto/MemberDTO';
import {MemberRequestDTO, MemberRequestStatus} from '../../dto/MemberRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  private rootURL = 'api'
  private createURL = '/createNGO'
  private updateURL = '/updateNGO'
  private deleteURL = '/deleteNGO'
  private getNGOsURL = '/findNGOs'
  private getNGOsCountURL = '/findNGOs/count'
  private uploadImageURL = '/uploadImage'
  private assignMemberToNGOURRL = '/addMembers';
  private getNgoRequestsURL = '/getNgoRequests/:ngoId';
  private getNgoRequestsNumberURL = '/getNgoRequests/number/:ngoId';
  private saveNgoRequestStatusURL = '/saveNgoRequestStatus/:status';
  private getNGOsNotMemberOfCountURL = '/findNGOsNotMemberOf/count';
  private getNGOsNotMemberOfURL = '/findNGOsNotMemberOf';

  constructor(private mainService: MainServiceService) {
  }


  create(ngo: NgoDTO) {
    return this.mainService.post(this.rootURL + this.createURL,
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  update(ngo: NgoDTO) {

    return this.mainService.post(this.rootURL + this.updateURL,
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  delete(ngos: NgoDTO[]) {
    return this.mainService.post(this.rootURL + this.deleteURL,
      ngos).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public updateLogo(logo: any) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL, logo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err.error.message);
    }));
  }

  public findNGOsCount() {
    return this.mainService.get(this.rootURL + this.getNGOsCountURL).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findNGOsNotMemberOfCount() {
    return this.mainService.get(this.rootURL + this.getNGOsNotMemberOfCountURL).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findNGOsNotMemberOf(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getNGOsNotMemberOfURL + queryString).pipe(map((result: NgoDTO[]) => {
      return plainToClass(NgoDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public addNgoMembers(ngo: NgoDTO, members: UserDTO[]) {
    let ngoMembers: MemberDTO[] = [];
    members.forEach(e => {
      let ngoMember: MemberDTO = new MemberDTO();
      ngoMember.user = e;
      ngoMember.ngo = ngo;
      ngoMember.function = 'functie random';
      ngoMembers.push(ngoMember);
    })
    return this.mainService.post(this.rootURL + this.assignMemberToNGOURRL, ngoMembers).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public getNgoRequestsNumber(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getNgoRequestsNumberURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public getNgoRequests(pageIndex: number, pageSize: number, ngo: NgoDTO) {
    let queryString: string = '';
    if (pageIndex && pageSize) {
      queryString += '?page=' + pageIndex + '&pageSize=' + pageSize;
    }
    return this.mainService.get(this.rootURL + this.getNgoRequestsURL.replace(':ngoId', ngo.id.toString()) + queryString).pipe(map((result: MemberRequestDTO[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public saveStatusMemberRequest(ngoMemberRequests: MemberRequestDTO[], status: MemberRequestStatus) {
    return this.mainService.post(this.rootURL + this.saveNgoRequestStatusURL.replace(':status', status.toString()), ngoMemberRequests ).pipe(map((result: MemberRequestDTO[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }
}
