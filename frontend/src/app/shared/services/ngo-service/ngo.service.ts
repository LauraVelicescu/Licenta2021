import {Injectable} from "@angular/core";
import {NgoDTO} from "../../dto/NgoDTO";
import {MainServiceService} from "../main/main-service.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NGOService {
  private rootURL = "api"
  private createURL = "/createNGO";
  private getURL = "/getNGO"
  private uploadImageURL = "/uploadImage"

  constructor(private mainService: MainServiceService) {
  }


  create(ngo: NgoDTO) {
    return this.mainService.post(this.rootURL + this.createURL,
      ngo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err);
    }));
  }

  public updateLogo(logo: any) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL, logo).pipe(map((result: NgoDTO) => {
      return result;
    }), catchError(err => {
      console.log(err)
      throw new Error(err);
    }));
  }
}
