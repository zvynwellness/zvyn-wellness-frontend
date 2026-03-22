import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmyserviceCategoryMenuComponent } from './hmyservice-category-menu.component';

describe('HmyserviceCategoryMenuComponent', () => {
  let component: HmyserviceCategoryMenuComponent;
  let fixture: ComponentFixture<HmyserviceCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmyserviceCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HmyserviceCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
