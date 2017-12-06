import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObiektyComponent } from './obiekty.component';

describe('ObiektyComponent', () => {
  let component: ObiektyComponent;
  let fixture: ComponentFixture<ObiektyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObiektyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObiektyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
