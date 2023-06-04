import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {Report} from '../../../layouts/admin-layout/submodules/project-module/subcomponents/project-hub/components/project-reports/project-reports.component';
import {catchError, map} from 'rxjs/operators';
import {ProjectDTO} from '../../dto/ProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private rootURL = 'api/report'
  private exportURL = '/export'

  constructor(private mainService: MainServiceService) {
  }

  downloadReport(report: Report, parameters?: Map<string, string>) {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.mainService.downloadFile(this.rootURL + this.exportURL, parameters).pipe(map((result: any) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }
}
