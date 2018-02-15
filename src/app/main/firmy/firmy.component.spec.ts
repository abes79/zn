import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmyComponent } from './firmy.component';

describe('FirmyComponent', () => {
  let component: FirmyComponent;
  let fixture: ComponentFixture<FirmyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
