import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FroomOrderMgmtComponent } from './froom-order-mgmt.component';

describe('FroomOrderMgmtComponent', () => {
  let component: FroomOrderMgmtComponent;
  let fixture: ComponentFixture<FroomOrderMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FroomOrderMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FroomOrderMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
