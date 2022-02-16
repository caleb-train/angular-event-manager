import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventTypesComponent } from './admin-event-types.component';

describe('AdminEventTypesComponent', () => {
  let component: AdminEventTypesComponent;
  let fixture: ComponentFixture<AdminEventTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
