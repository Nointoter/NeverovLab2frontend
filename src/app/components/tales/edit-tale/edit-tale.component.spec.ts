import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaleComponent } from './edit-tale.component';

describe('EditTaleComponent', () => {
  let component: EditTaleComponent;
  let fixture: ComponentFixture<EditTaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
