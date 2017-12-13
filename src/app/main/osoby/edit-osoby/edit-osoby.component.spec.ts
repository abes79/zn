import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOsobyComponent } from './edit-osoby.component';

describe('EditOsobyComponent', () => {
  let component: EditOsobyComponent;
  let fixture: ComponentFixture<EditOsobyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOsobyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOsobyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
