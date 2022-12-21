import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FroomOrdersComponent } from './froom-orders.component';

describe('FroomOrdersComponent', () => {
  let component: FroomOrdersComponent;
  let fixture: ComponentFixture<FroomOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FroomOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FroomOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
