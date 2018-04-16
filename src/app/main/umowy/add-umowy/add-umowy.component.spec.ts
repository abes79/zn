import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUmowyComponent } from './add-umowy.component';

describe('AddUmowyComponent', () => {
  let component: AddUmowyComponent;
  let fixture: ComponentFixture<AddUmowyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUmowyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUmowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
