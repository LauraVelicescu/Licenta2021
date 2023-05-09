import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ApplicationService} from './shared/services/application/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'MANGO';

  constructor(private applicationService: ApplicationService, private cdref: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }


}
