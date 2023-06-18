import {Injectable} from '@angular/core';
import {UserService} from '../user-service/user.service';
import {ApplicationRoutesInfo, RouteInfo} from '../../util/ApplicationRoutesInfo';
import {fakeAsync} from '@angular/core/testing';
import {Observable, ReplaySubject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserDTO} from '../../dto/UserDTO';
import {SecurityStorage} from '../../../security/SecurityStorage';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private _loading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  public globalPrivileges: string[] = [];
  public _retrievedImage: ReplaySubject<string> = new ReplaySubject<string>();

  constructor(private userService: UserService, private securityStorage: SecurityStorage) {
    this._loading.next(false);
  }

  public buildNavbarStored() {
    this.globalPrivileges = this.securityStorage.getPermissions();
    let routesCopy: RouteInfo[]  = ApplicationRoutesInfo.ADMIN_ROUTES.map(x => Object.assign({}, x));
    let navbarLayout: RouteInfo[] =
      routesCopy.filter(ar => {
        if (ar.privileges) {
          for (let i = 0; i < ar.privileges.length; i++) {
            let arp = ar.privileges[i];
            if (this.globalPrivileges.includes(arp)) {
              ar.subPaths = ar.subPaths.filter(sp => {
                for (let j = 0; j < sp.privileges.length; j++) {
                  let spp = sp.privileges[j];

                  if (this.globalPrivileges.includes(spp)) {
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
    this.userService.getUserImage().subscribe((result) => {
      if(result.profilePicture) {
        this._retrievedImage.next( 'data:image/jpeg;base64,' + result.profilePicture);
      }
    })
    return navbarLayout
  }

  public  buildNavbarForUserNotStored() {
    let userPrivileges: string[] = ['ANY']
      return this.userService.getUser().pipe(map((result: UserDTO) => {
         let roles: string[] = result.roles.map(r => r.name.toUpperCase())
        for (const role of roles) {
          userPrivileges.push(role)
        }
        this.globalPrivileges = userPrivileges;
        this.securityStorage.storePermissions(this.globalPrivileges);
        this.securityStorage.storeLoggedUser(result.id.toString());
        let routesCopy: RouteInfo[]  = ApplicationRoutesInfo.ADMIN_ROUTES.map(x => Object.assign({}, x));
        let navbarLayout: RouteInfo[] =
          routesCopy.filter(ar => {
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

        this.userService.getUserImage().subscribe((image) => {
          if(image.profilePicture) {
            this._retrievedImage.next( 'data:image/jpeg;base64,' + image.profilePicture);
          }
        })
        return navbarLayout
      }), catchError(err => {
        throw new Error(err);
      }));
  }

  public get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public get retrievedImage(): Observable<string> {
    return this._retrievedImage.asObservable();
  }

  public emmitLoading(value: boolean) {
    this._loading.next(value);
  }

}
