import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSelledProductsComponent } from './seller-selled-products.component';

describe('SellerSelledProductsComponent', () => {
  let component: SellerSelledProductsComponent;
  let fixture: ComponentFixture<SellerSelledProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSelledProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSelledProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
