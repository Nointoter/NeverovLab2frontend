import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalesListComponent } from './tales-list.component';

describe('TalesListComponent', () => {
  let component: TalesListComponent;
  let fixture: ComponentFixture<TalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
