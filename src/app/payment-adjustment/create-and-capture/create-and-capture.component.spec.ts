import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndCaptureComponent } from './create-and-capture.component';

describe('CreateAndCaptureComponent', () => {
  let component: CreateAndCaptureComponent;
  let fixture: ComponentFixture<CreateAndCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAndCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAndCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
