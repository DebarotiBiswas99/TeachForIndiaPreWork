import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistComponent } from './viewlist.component';

describe('ViewlistComponent', () => {
  let component: ViewlistComponent;
  let fixture: ComponentFixture<ViewlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewlistComponent]
    });
    fixture = TestBed.createComponent(ViewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
