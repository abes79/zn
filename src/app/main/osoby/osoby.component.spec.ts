import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobyComponent } from './osoby.component';

describe('OsobyComponent', () => {
  let component: OsobyComponent;
  let fixture: ComponentFixture<OsobyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsobyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
