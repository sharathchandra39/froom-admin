import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FroomLocationsComponent } from './froom-locations.component';

describe('FroomLocationsComponent', () => {
  let component: FroomLocationsComponent;
  let fixture: ComponentFixture<FroomLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FroomLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FroomLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
