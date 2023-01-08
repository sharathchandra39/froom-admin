import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMgmtComponent } from './merchant-mgmt.component';

describe('MerchantMgmtComponent', () => {
  let component: MerchantMgmtComponent;
  let fixture: ComponentFixture<MerchantMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
