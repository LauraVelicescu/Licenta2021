import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoLayoutComponent } from './ngo-layout.component';

describe('NgoLayoutComponent', () => {
  let component: NgoLayoutComponent;
  let fixture: ComponentFixture<NgoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
