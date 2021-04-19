import {Injectable} from '@angular/core';
import {User} from 'src/app/user';
import {MainServiceService} from '../main/main-service.service';
import {UserDTO} from '../../components/dto/UserDTO';
import {catchError, map} from 'rxjs/operators';
import {PasswordDTO} from '../../components/dto/PasswordDTO';
import {SecurityStorage} from '../../security/SecurityStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private rootURL = 'api/authenticate';
  private registerUrl = '/register';
  private loginUrl = '/login';
  private forgotPasswordURL = '/resetPassword';
  private validateChangePasswordURL = '/changePassword';
  private resetPasswordURL = '/savePassword';

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage) {
  }

  public login(userInfo: UserDTO) {
    console.log('sunt in  login');
    return this.mainService.post(this.rootURL + this.loginUrl,
      {username: userInfo.emailAddress, password: userInfo.password}).pipe(map((result : any) => {
      this.securityStorage.store(result.token);
      console.log(result);
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }

  public isLoggedIn() {
    return this.securityStorage.getStored() !== null;
  }

  public logout() {
    this.securityStorage.clear();
  }

  public validateToken(token: string){
    return this.mainService.get(this.rootURL + this.validateChangePasswordURL + '?token=' + token).pipe(map((result) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }

  public forgotPassword(userInfo: UserDTO){
    return this.mainService.post(this.rootURL + this.forgotPasswordURL, userInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
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
