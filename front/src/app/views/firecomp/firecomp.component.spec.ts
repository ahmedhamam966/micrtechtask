import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirecompComponent } from './firecomp.component';

describe('FirecompComponent', () => {
  let component: FirecompComponent;
  let fixture: ComponentFixture<FirecompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirecompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
