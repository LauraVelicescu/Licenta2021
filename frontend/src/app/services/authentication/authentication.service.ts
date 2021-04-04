import {Injectable} from '@angular/core';
import {User} from 'src/app/user';
import {MainServiceService} from '../main/main-service.service';
import {UserDTO} from '../../components/dto/UserDTO';
import {catchError, map} from 'rxjs/operators';
import {PasswordDTO} from "../../components/dto/PasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private rootURL = 'api/authenticate';
  private registerUrl = '/register';
  private loginUrl = '/login';
  private validateChangePasswordURL = '/changePassword';
  private resetPasswordURL = '/savePassword';

  constructor(private mainService: MainServiceService) {
  }

  public login(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.loginUrl, userInfo).pipe(map((result) => {
      console.log(result);
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  public validateToken(token: string){
    return this.mainService.get(this.rootURL + this.validateChangePasswordURL + '?token=' + token).pipe(map((result) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }

  public resetPassword(passwordInfo: PasswordDTO){
    return this.mainService.post(this.rootURL + this.resetPasswordURL, passwordInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }

  public register(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.registerUrl, userInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }
}
