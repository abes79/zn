import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUmowyComponent } from './edit-umowy.component';

describe('EditUmowyComponent', () => {
  let component: EditUmowyComponent;
  let fixture: ComponentFixture<EditUmowyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUmowyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUmowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
