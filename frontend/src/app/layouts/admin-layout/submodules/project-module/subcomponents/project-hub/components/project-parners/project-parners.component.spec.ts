import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectParnersComponent } from './project-parners.component';

describe('ProjectParnersComponent', () => {
  let component: ProjectParnersComponent;
  let fixture: ComponentFixture<ProjectParnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectParnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectParnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
