import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAdviceComponent } from './investment-advice.component';

describe('InvestmentAdviceComponent', () => {
  let component: InvestmentAdviceComponent;
  let fixture: ComponentFixture<InvestmentAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
