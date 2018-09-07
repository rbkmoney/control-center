import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaymentsAdjustmentsComponent } from './search-payments-adjustments.component';

describe('SearchPaymentsAdjustmentsComponent', () => {
  let component: SearchPaymentsAdjustmentsComponent;
  let fixture: ComponentFixture<SearchPaymentsAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPaymentsAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaymentsAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
