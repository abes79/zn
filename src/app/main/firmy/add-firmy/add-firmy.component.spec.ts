import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirmyComponent } from './add-firmy.component';

describe('AddFirmyComponent', () => {
  let component: AddFirmyComponent;
  let fixture: ComponentFixture<AddFirmyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirmyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
