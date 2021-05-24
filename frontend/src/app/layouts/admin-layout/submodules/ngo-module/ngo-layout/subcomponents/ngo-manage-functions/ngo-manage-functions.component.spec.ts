import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoManageFunctionsComponent } from './ngo-manage-functions.component';

describe('NgoManageFunctionsComponent', () => {
  let component: NgoManageFunctionsComponent;
  let fixture: ComponentFixture<NgoManageFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoManageFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoManageFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
