import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {UserDTO} from '../../dto/UserDTO';
import {catchError, map} from 'rxjs/operators';
import {PasswordDTO} from '../../dto/PasswordDTO';
import {SecurityStorage} from '../../../security/SecurityStorage';
import {Router} from '@angular/router';

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

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage, private router: Router) {
    this.mainService.setAuthenticationService(this);
  }

  public login(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.loginUrl,
      {username: userInfo.emailAddress, password: userInfo.password}).pipe(map((result: any) => {
      this.securityStorage.store(result.token);
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }))
  }

  public isLoggedIn() {
    return this.securityStorage.getStored() !== null;
  }

  public logout() {
    this.securityStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  public validateToken(token: string) {
    return this.mainService.get(this.rootURL + this.validateChangePasswordURL + '?token=' + token).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public forgotPassword(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.forgotPasswordURL, userInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }))
  }

  public resetPassword(passwordInfo: PasswordDTO) {
    return this.mainService.post(this.rootURL + this.resetPasswordURL, passwordInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }))
  }

  public register(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.registerUrl, userInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }))
  }
}
