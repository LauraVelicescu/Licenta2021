import { Injectable } from '@angular/core';
import {NGODTO} from "../components/dto/NGODTO";
import {MainServiceService} from "./main/main-service.service";
import {SecurityStorage} from "../security/SecurityStorage";
import {catchError, map} from "rxjs/operators";
import {UserDTO} from "../components/dto/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  private rootURL = 'api'
  private updateURL = '/updateNGO';
  private getURL = '/getNGO'
  private uploadImageURL = '/uploadImage'

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage) {
  }


  update(ngo: NGODTO) {
    return this.mainService.post(this.rootURL + this.updateURL,
      ngo).pipe(map((result: NGODTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }));
  }

  getNGO() {
    return this.mainService.get(this.rootURL + this.getURL).pipe(map((result : NGODTO) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }
  public updateLogo(logo: any){
    return this.mainService.postFile(this.rootURL + this.uploadImageURL,  logo).pipe(map((result :NGODTO ) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }
}
