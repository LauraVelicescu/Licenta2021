import { Injectable } from '@angular/core';
import {MainServiceService} from "./main/main-service.service";
import {SecurityStorage} from "../security/SecurityStorage";
import {UserDTO} from "../components/dto/UserDTO";
import {catchError, map} from "rxjs/operators";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootURL = 'api'
  private updateURL = '/updateUser';
  private getURL = '/getUser'

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage) {
  }

  public update(userInfo: UserDTO) {
    console.log('sunt in  update');
    return this.mainService.post(this.rootURL + this.updateURL,
      userInfo).pipe(map((result : UserDTO) => {
        return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }
  public getUser(){
    return this.mainService.get(this.rootURL + this.getURL).pipe(map((result : UserDTO) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }

}
