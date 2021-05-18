import {Injectable} from '@angular/core';
import {UserService} from '../user-service/user.service';
import {ApplicationRoutesInfo, RouteInfo} from '../../util/ApplicationRoutesInfo';
import {fakeAsync} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private userService: UserService) {
  }


  public buildNavbarForUser(): RouteInfo[] {
    let userPrivileges: string[] = ['privilegiu1', 'privilegiu2', 'privilegiu3'];
    let navbarLayout: RouteInfo[] =
      ApplicationRoutesInfo.ADMIN_ROUTES.filter(ar => {
        if (ar.privileges) {
          for (let i = 0; i < ar.privileges.length; i++) {
              let arp = ar.privileges[i];
            if (userPrivileges.includes(arp)) {
              ar.subPaths = ar.subPaths.filter(sp => {
                for(let j = 0; j< sp.privileges.length; j++ ){
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
    return navbarLayout;
  }

  public loading(value: boolean) {

  }
}
