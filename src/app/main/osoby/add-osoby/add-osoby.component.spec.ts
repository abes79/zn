import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOsobyComponent } from './add-osoby.component';

describe('AddOsobyComponent', () => {
  let component: AddOsobyComponent;
  let fixture: ComponentFixture<AddOsobyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOsobyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOsobyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
