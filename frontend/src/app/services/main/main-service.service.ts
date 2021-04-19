import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityStorage} from '../../security/SecurityStorage';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private http: HttpClient,
              private router: Router,
              private securityStorage: SecurityStorage){
  }


  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
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
      headers: headers,
      withCredentials: true
    });
  }

  post(url: string, body?: any) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.post(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  put(url: string, body?: any) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.put(url, body, {
      headers: headers,
      withCredentials: true
    });
  }

  delete(url: string) {
    url = this.processURL(url);
    const headers = this.headers();
    return this.http.delete(url, {
      headers: headers,
      withCredentials: true
    });
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
