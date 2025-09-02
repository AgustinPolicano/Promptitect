import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingHomeSection } from './pricing-home-section';

describe('PricingHomeSection', () => {
  let component: PricingHomeSection;
  let fixture: ComponentFixture<PricingHomeSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingHomeSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingHomeSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
