import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) {
    if (this.diameter === undefined || isNaN(this.diameter)) {
      this.diameter = 60;
    }
  }


  @Input() diameter: number;
  @Input() overlay: boolean;

  subscription;

  classesMap: Map<number, string> = new Map<number, string>([
    [0, 'red'], [1, 'yellow'], [2, 'blue'], [3, 'green'], [4, 'purple'], [5, 'orange']
  ]);

  currentColor: number = 0;
  currentClass: string = 'red';

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      if (this.currentColor === 5) {
        this.currentColor = 0;
      } else {
        this.currentColor += 1;
      }
      this.currentClass = this.classesMap.get(this.currentColor);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}
