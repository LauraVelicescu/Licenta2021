import {Injectable} from '@angular/core';
import {User} from 'src/app/user';
import {MainServiceService} from '../main/main-service.service';
import {UserDTO} from '../../components/dto/UserDTO';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private rootURL = 'api/authentication';
  private registerUrl = '/register';
  private loginUrl = '/login';

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

  public register(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.registerUrl, userInfo).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }))
  }
}
