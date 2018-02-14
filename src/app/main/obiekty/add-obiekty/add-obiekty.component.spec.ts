import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObiektyComponent } from './add-obiekty.component';

describe('AddObiektyComponent', () => {
  let component: AddObiektyComponent;
  let fixture: ComponentFixture<AddObiektyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObiektyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObiektyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
