import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSiderComponent } from './mobile-sider.component';

describe('MobileSiderComponent', () => {
  let component: MobileSiderComponent;
  let fixture: ComponentFixture<MobileSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
