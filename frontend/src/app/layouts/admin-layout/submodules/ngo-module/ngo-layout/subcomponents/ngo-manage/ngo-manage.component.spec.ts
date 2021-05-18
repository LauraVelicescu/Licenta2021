import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoManageComponent } from './ngo-manage.component';

describe('NgoManageComponent', () => {
  let component: NgoManageComponent;
  let fixture: ComponentFixture<NgoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
