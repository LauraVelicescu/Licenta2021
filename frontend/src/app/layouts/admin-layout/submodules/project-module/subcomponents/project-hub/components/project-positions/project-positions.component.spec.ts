import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPositionsComponent } from './project-positions.component';

describe('ProjectPositionsComponent', () => {
  let component: ProjectPositionsComponent;
  let fixture: ComponentFixture<ProjectPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
