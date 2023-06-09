import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoPartnersTypeComponent } from './ngo-partners-type.component';

describe('NgoPartnersTypeComponent', () => {
  let component: NgoPartnersTypeComponent;
  let fixture: ComponentFixture<NgoPartnersTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoPartnersTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoPartnersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
