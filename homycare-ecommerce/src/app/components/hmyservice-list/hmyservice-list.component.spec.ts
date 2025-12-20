import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmyserviceListComponent } from './hmyservice-list.component';

describe('HmyserviceListComponent', () => {
  let component: HmyserviceListComponent;
  let fixture: ComponentFixture<HmyserviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmyserviceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HmyserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
