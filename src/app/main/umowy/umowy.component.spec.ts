import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmowyComponent } from './umowy.component';

describe('UmowyComponent', () => {
  let component: UmowyComponent;
  let fixture: ComponentFixture<UmowyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmowyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
