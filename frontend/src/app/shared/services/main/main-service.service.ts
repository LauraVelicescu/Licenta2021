import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityStorage} from '../../../security/SecurityStorage';
import {UserService} from '../user-service/user.service';
import {NotificationService} from '../notification-service/notification.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private authenticationService: AuthenticationService;

  constructor(private http: HttpClient,
              private router: Router,
              private securityStorage: SecurityStorage,
              private notificationService: NotificationService) {
  }


  setAuthenticationService(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }


  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: this.securityStorage.getStored() ? 'Bearer ' + this.securityStorage.getStored() : '',
      'Access-Control-Allow-Origin': '*'
    });
  }

  private headersFile(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.securityStorage.getStored() ? 'Bearer ' + this.securityStorage.getStored() : '',
      'Access-Control-Allow-Origin': '*'
    });
  }


  processURL(url: string): string {
    if (environment.production === true) {
      url = url.replace('api', environment.API_ENDPOINT);
    }
    return url;
  }

  get(url: string, pathParams?: Array<string>): Observable<Object> {
    url = this.processURL(url);
    const headers: HttpHeaders = this.headers();
    if (pathParams) {
      pathParams.forEach((pathParam: string) => {
        url += '/' + pathParam;
      });
    }
    return this.http.get(url, {
      headers,
      withCredentials: true
    });
  }

  post(url: string, body?: any) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.post(url, body, {
      headers,
      withCredentials: true,
    });
  }



  postFile(url: string, body?: any) {
    url = this.processURL(url);
    const headers = this.headersFile();
    return this.http.post(url, body, {
      headers,
      withCredentials: true
    });
  }

  put(url: string, body?: any) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.put(url, body, {
      headers,
      withCredentials: true
    });
  }

  delete(url: string) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.delete(url, {
      headers,
      withCredentials: true
    });
  }

  httpError(err) {
    if (!navigator.onLine) {
      this.notificationService.warning('no_internet_connection');
    } else {
      if (err.status === 401) {
        this.notificationService.warning('session_error');
        this.authenticationService.logout();
      } else if (err.status === 403) {
      } else if (err.status === 412) {
        // nothing here, managed by caller
      } else if (err.status === 404) {
      } else if (err.status === 400) {
        this.notificationService.error(err.error);
      } else {
        console.error(err);
        this.notificationService.error('error');
      }
    }
  }

  // download(url: string) {
  //   url = this.processURL(url);
  //   const headers = new HttpHeaders(
  //     {'lang': localStorage.getItem(Translate.localStorageLangKey)});
  //   return this.http.get(url, {
  //     headers,
  //     observe: 'response',
  //     responseType: 'blob',
  //     withCredentials: true
  //   });
  // }
}
