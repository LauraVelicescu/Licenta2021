import {Component, Input, OnInit} from '@angular/core';
import {ReportService} from '../../../../../../../../shared/services/report/report.service';
import {ProjectDTO} from '../../../../../../../../shared/dto/ProjectDTO';

export enum Report {
  PROJECT_TEAM = 'Project team',
  TASK_BACKLOG = 'Task backlog',
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

  @Input()
  selectedProject: ProjectDTO;

  reportsList: Report[] = [Report.PROJECT_TEAM, Report.TASK_BACKLOG, Report.PROJECT_FINANCIAL_SITUATION];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

  get reports() {
    return Report;
  }

  downloadReport(report: Report) {
    this.reportService.downloadReport(report, {projectId: this.selectedProject.id}).subscribe(blob => {
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
