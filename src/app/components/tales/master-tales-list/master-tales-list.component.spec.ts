import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTalesListComponent } from './master-tales-list.component';

describe('MasterTalesListComponent', () => {
  let component: MasterTalesListComponent;
  let fixture: ComponentFixture<MasterTalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTalesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
