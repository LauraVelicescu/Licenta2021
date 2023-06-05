import {Injectable} from '@angular/core';
import {UserService} from '../user-service/user.service';
import {ApplicationRoutesInfo, RouteInfo} from '../../util/ApplicationRoutesInfo';
import {fakeAsync} from '@angular/core/testing';
import {Observable, ReplaySubject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserDTO} from '../../dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private _loading: ReplaySubject<boolean> = new ReplaySubject<boolean>();


  constructor(private userService: UserService) {
    this._loading.next(false);
  }


  public  buildNavbarForUser() {
    let userPrivileges: string[] = ['ANY']
    return this.userService.getUser().pipe(map((result: UserDTO) => {
      let roles: string[] = result.roles.map(r => r.name.toUpperCase())
      roles.forEach(r => {
        userPrivileges.push(r)
      })
      let navbarLayout: RouteInfo[] =
        ApplicationRoutesInfo.ADMIN_ROUTES.filter(ar => {
          if (ar.privileges) {
            for (let i = 0; i < ar.privileges.length; i++) {
              let arp = ar.privileges[i];
              if (userPrivileges.includes(arp)) {
                ar.subPaths = ar.subPaths.filter(sp => {
                  for (let j = 0; j < sp.privileges.length; j++) {
                    let spp = sp.privileges[j];
                    if (userPrivileges.includes(spp)) {
                      return true;
                    }
                  }
                  return false;
                })
                return true;
              }
            }
            return false;
          } else {
            return false;
          }
        });
      return navbarLayout
    }), catchError(err => {
      throw new Error(err);
    }));
  }

  public get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public emmitLoading(value: boolean) {
    this._loading.next(value);
  }

}
