import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFirmyComponent } from './edit-firmy.component';

describe('EditFirmyComponent', () => {
  let component: EditFirmyComponent;
  let fixture: ComponentFixture<EditFirmyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFirmyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFirmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
