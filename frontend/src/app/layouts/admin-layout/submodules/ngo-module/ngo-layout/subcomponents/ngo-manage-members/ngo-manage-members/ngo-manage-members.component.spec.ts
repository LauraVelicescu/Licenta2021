import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoManageMembersComponent } from './ngo-manage-members.component';

describe('NgoManageMembersComponent', () => {
  let component: NgoManageMembersComponent;
  let fixture: ComponentFixture<NgoManageMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoManageMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoManageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
