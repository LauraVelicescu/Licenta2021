import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../../../../../../shared/services/report/report.service';

export enum Report {
  PROJECT_TEAM = 'Project team',
  TASK_BACKLOG = 'Task backlog',
  PROJECT_PROGRESS = 'Project progress',
  TASK_PROGRESS = 'Task progress',
  PROJECT_FINANCIAL_SITUATION = 'Project financial situation',
  NGO_YEAR_FINANCIAL_SITUATION = 'Ngo year financial situation',
  NGO_FINANCIAL_SITUATION = 'Ngo financial situation'
}

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.scss']
})
export class ProjectReportsComponent implements OnInit {

  reportsList: Report[] = [Report.PROJECT_TEAM, Report.PROJECT_PROGRESS, Report.TASK_BACKLOG, Report.PROJECT_FINANCIAL_SITUATION];
  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

  get reports() {
    return Report;
  }

  downloadReport(report: Report) {
    this.reportService.downloadReport(report).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
