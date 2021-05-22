import {Injectable} from "@angular/core";
import {NgoDTO} from "../../dto/NgoDTO";
import {MainServiceService} from "../main/main-service.service";
import {catchError, map} from "rxjs/operators";
import {plainToClass} from "class-transformer";

@Injectable({
  providedIn: "root"
})
export class NGOService {
  private rootURL = "api"
  private createURL = "/createNGO"
  private updateURL = "/updateNGO"
  private deleteURL = "/deleteNGO"
  private getNGOsURL = '/findNGOs'
  private getNGOsCountURL = '/findNGOs/count'
  private uploadImageURL = "/uploadImage"

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

  update(ngo: NgoDTO){

    return this.mainService.post(this.rootURL + this.updateURL,
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  delete(ngos: NgoDTO[]){
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

  findNGOsCount() {
    return this.mainService.get(this.rootURL + this.getNGOsCountURL ).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  findNGOs(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getNGOsURL + queryString).pipe(map((result: NgoDTO[]) => {
      return plainToClass(NgoDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }
}
