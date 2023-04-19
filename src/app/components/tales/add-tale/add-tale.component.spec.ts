import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaleComponent } from './add-tale.component';

describe('AddTaleComponent', () => {
  let component: AddTaleComponent;
  let fixture: ComponentFixture<AddTaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
