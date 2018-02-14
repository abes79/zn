import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObiektyComponent } from './edit-obiekty.component';

describe('EditObiektyComponent', () => {
  let component: EditObiektyComponent;
  let fixture: ComponentFixture<EditObiektyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObiektyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObiektyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
