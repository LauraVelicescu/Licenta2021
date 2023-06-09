import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoYearComponent } from './ngo-year.component';

describe('NgoYearComponent', () => {
  let component: NgoYearComponent;
  let fixture: ComponentFixture<NgoYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
