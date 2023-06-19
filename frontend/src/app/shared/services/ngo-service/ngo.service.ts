import {Injectable} from '@angular/core';
import {NgoDTO} from '../../dto/NgoDTO';
import {MainServiceService} from '../main/main-service.service';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {MemberDTO} from '../../dto/MemberDTO';
import {MemberRequestDTO, MemberRequestStatus} from '../../dto/MemberRequestDTO';
import {FunctionDTO} from '../../dto/FunctionDTO';
import {UserRoleDTO} from '../../dto/UserRoleDTO';

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  private rootURL = 'api/ngo'
  private rootMemberURL ='api/member'
  private updateURL = '/:ngoId'
  private deleteURL = '/ids'
  private getManagedNGOsURL = '/findManagedNGOs'
  private getManagedNGOsCountURL = '/findManagedNGOs/count'
  private getAllNGOsURL = '/findAllNgos'
  private getAllNGOsCountURL = '/findAllNgos/count'
  private uploadImageURL = '/uploadImage'
  private getNgoRequestsURL = '/getNgoRequests/:ngoId';
  private getNgoRequestsNumberURL = '/getNgoRequests/number/:ngoId';
  private saveNgoRequestStatusURL = '/saveNgoRequestStatus/:status';
  private getNGOsNotMemberOfCountURL = '/findNGOsNotMemberOf/count';
  private getNGOsNotMemberOfURL = '/findNGOsNotMemberOf';
  private getMyNGOsURL = '/findMyNGOs';
  private getNGOFunctionsCountURL = '/findNgoFunctions/count/:ngoId';
  private getNGOFunctionsURL = '/findNgoFunctions/:ngoId';
  private deleteNGOFunctionsURL = '/deleteNGOFunction';
  private addNGOFunctionURL = '/addNGOFunction/:ngoId';
  private updateNGOFunctionURL = '/updateNGOFunction';
  private setMemberFunctionURL = '/setMemberFunction/:functionId';
  private roleReportsNGOURL = '/getRoleReport/:ngoId'
  private roleActiveMemberNGOURL = '/getRoleActiveMember/:ngoId'

  constructor(private mainService: MainServiceService) {
  }


  create(ngo: NgoDTO) {
    return this.mainService.post(this.rootURL,
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  update(ngo: NgoDTO) {

    return this.mainService.put(this.rootURL + this.updateURL.replace(':ngoId', ngo.id.toString()),
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  delete(ngos: NgoDTO[]) {
    let ids = '?ids=';
    ngos.forEach(e => {
      ids += e.id + ','
    });
    ids = ids.substring(0, ids.length - 1)
    return this.mainService.delete(this.rootURL + this.deleteURL + ids).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public updateLogo(logo: any) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL, logo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public findManagedNGOsCount() {
    return this.mainService.get(this.rootURL + this.getManagedNGOsCountURL).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public findManagedNGOs(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page !== undefined && pageSize) {
      queryString += '?page=' + page + '&pageNo=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getManagedNGOsURL + queryString).pipe(map((result: NgoDTO[]) => {
      return plainToClass(NgoDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findAllNGOsCount() {
    return this.mainService.get(this.rootURL + this.getAllNGOsCountURL).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public findAllNGOs(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page !== undefined && pageSize) {
      queryString += '?page=' + page + '&pageNo=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getAllNGOsURL + queryString).pipe(map((result: NgoDTO[]) => {
      return plainToClass(NgoDTO, result, {enableCircularCheck: false});
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

  public findRoleReport(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.roleReportsNGOURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: UserRoleDTO) => {
      return plainToClass(UserRoleDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findRoleActiveMember(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.roleActiveMemberNGOURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: UserRoleDTO) => {
      return plainToClass(UserRoleDTO, result, {enableCircularCheck: false});
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
    return this.mainService.post(this.rootMemberURL + this.saveNgoRequestStatusURL.replace(':status', status.toString()), ngoMemberRequests ).pipe(map((result: MemberRequestDTO[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findMyNGOs(){
    return this.mainService.get(this.rootURL + this.getMyNGOsURL).pipe(map((result: NgoDTO[]) => {
      return plainToClass(NgoDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findNGOFunctionsCount(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getNGOFunctionsCountURL.replace(":ngoId", ngo.id.toString())).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findNGOFunctions(ngo: NgoDTO, page?: number, pageSize?: number, filter?: any, ) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getNGOFunctionsURL.replace(":ngoId", ngo.id.toString()) + queryString).pipe(map((result: FunctionDTO[]) => {
      return plainToClass(FunctionDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteFunction(ngoFunctions: FunctionDTO[]){
    return this.mainService.post(this.rootURL + this.deleteNGOFunctionsURL,
      ngoFunctions).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
}

  public addFunction(ngoFunction:FunctionDTO, ngo: NgoDTO){
    return this.mainService.post(this.rootURL + this.addNGOFunctionURL.replace(":ngoId", ngo.id.toString()), ngoFunction).pipe(map((result: FunctionDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public updateFunction(ngoFunction:FunctionDTO){
    return this.mainService.post(this.rootURL + this.updateNGOFunctionURL, ngoFunction).pipe(map((result: FunctionDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public setMemberFunction(member: MemberDTO, ngoFunction: FunctionDTO){
    return this.mainService.post(this.rootURL + this.setMemberFunctionURL.replace(":functionId", ngoFunction.id.toString()), member).pipe(map((result: MemberDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }
}
