import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {UserService} from '../../shared/services/user-service/user.service';
import {NGOService} from '../../shared/services/ngo-service/ngo.service';
import {formatDate} from '@angular/common';
import {ProjectService} from '../../shared/services/project-service/project.service';
import {TaskService} from '../../shared/services/task-service/task.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectDTO} from '../../shared/dto/ProjectDTO';
import {UserDTO} from '../../shared/dto/UserDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any[] = [];
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  countInProgress: any;
  countBlocked: any;
  countDone: any;

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<ProjectDTO>([]);
  lengthProject: any;

  displayedColumnsMember: string[] = ['Nume', 'Prenume', 'Email'];
  dataSourceMember = new MatTableDataSource<UserDTO>([]);



  constructor(private userService: UserService,
              private ngoService: NGOService,
              private projectService: ProjectService,
              private taskService: TaskService) {
  }

   ngOnInit() {

     this.projectService.findAllProjects().subscribe((result) => {
       this.dataSource.data = result;
       this.lengthProject = result.length
     }, error => {
     })

     this.userService.findUsers().subscribe((result) => {
       this.dataSourceMember.data = result;
     }, error => {
     })

    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#2380f7'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#2380f7'
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#ff8a76'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#ff8a76'
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }]
      }
    };


    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }]
      }
    };


    var ip_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let ip_values = [];
    this.taskService.findHistoryByStatus('IN_PROGRESS').subscribe((result) => {
      this.countInProgress = result.length
      let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let u of result) {
        if (new Date(u.date).getFullYear() === new Date().getFullYear()) {
          months[new Date(u.date).getMonth()]++;
        }
      }
      ip_values = months

      this.canvas = document.getElementById('chartLineGreen');
      this.ctx = this.canvas.getContext('2d');

      var data = {
        labels: ip_labels,
        datasets: [{
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: ip_values,
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });
    })


     var c_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
     let c_tasks = [];
     this.taskService.findHistoryByStatus('DONE').subscribe((result) => {
       this.countDone = result.length
       let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       for (let u of result) {
         if (new Date(u.date).getFullYear() === new Date().getFullYear()) {
           months[new Date(u.date).getMonth()]++;
         }
       }
       c_tasks = months

       this.canvas = document.getElementById('chartLineRed');
       this.ctx = this.canvas.getContext('2d');

       var data = {
         labels: c_labels,
         datasets: [{
           fill: true,
           backgroundColor: gradientStroke,
           borderColor: '#00d6b4',
           borderWidth: 2,
           borderDash: [],
           borderDashOffset: 0.0,
           pointBackgroundColor: '#00d6b4',
           pointBorderColor: 'rgba(255,255,255,0)',
           pointHoverBackgroundColor: '#00d6b4',
           pointBorderWidth: 20,
           pointHoverRadius: 4,
           pointHoverBorderWidth: 15,
           pointRadius: 4,
           data: c_tasks,
         }]
       };

       var myChart = new Chart(this.ctx, {
         type: 'line',
         data: data,
         options: gradientChartOptionsConfigurationWithTooltipGreen

       });
     })

     var b_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
     let b_values = [];
     this.taskService.findHistoryByStatus('BLOCKED').subscribe((result) => {
       this.countBlocked = result.length
       let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       for (let u of result) {
         if (new Date(u.date).getFullYear() === new Date().getFullYear()) {
           months[new Date(u.date).getMonth()]++;
         }
       }
       b_values = months

       this.canvas = document.getElementById('chartLineYellow');
       this.ctx = this.canvas.getContext('2d');

       var data = {
         labels: b_labels,
         datasets: [{
           fill: true,
           backgroundColor: gradientStroke,
           borderColor: '#00d6b4',
           borderWidth: 2,
           borderDash: [],
           borderDashOffset: 0.0,
           pointBackgroundColor: '#00d6b4',
           pointBorderColor: 'rgba(255,255,255,0)',
           pointHoverBackgroundColor: '#00d6b4',
           pointBorderWidth: 20,
           pointHoverRadius: 4,
           pointHoverBorderWidth: 15,
           pointRadius: 4,
           data: b_values,
         }]
       };

       var myChart = new Chart(this.ctx, {
         type: 'line',
         data: data,
         options: gradientChartOptionsConfigurationWithTooltipGreen

       });
     })

    var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [];
    this.userService.findUsers().subscribe((result) => {
      let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let u of result) {
        if (new Date(u.createdDate).getFullYear() === new Date().getFullYear()) {
          months[new Date(u.createdDate).getMonth()]++;
        }
      }
      this.datasets.push(months);
      this.ngoService.findAllNGOs().subscribe((result2) => {
        let months2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let u of result2) {
          if (new Date(u.createdDate).getFullYear() === new Date().getFullYear()) {
            months2[new Date(u.createdDate).getMonth()]++;
          }
        }
        this.datasets.push(months2);
        this.projectService.findAllProjects().subscribe((result3) => {
          let months3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let u of result3) {
            if (new Date(u.startDate).getFullYear() === new Date().getFullYear()) {
              months3[new Date(u.startDate).getMonth()]++;
            }
          }
          this.datasets.push(months3);
        })
      })
    })





    this.data = this.datasets[0];


    this.canvas = document.getElementById('chartBig1');
    this.ctx = this.canvas.getContext('2d');

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: 'My First dataset',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);
  }

  public formatDateLocal(date: Date) {
    if (date) {
      let x = formatDate(date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
