import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplyComponent } from './user-apply.component';

describe('UserApplyComponent', () => {
  let component: UserApplyComponent;
  let fixture: ComponentFixture<UserApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
