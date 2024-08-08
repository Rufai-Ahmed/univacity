import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        CommonModule,
        FontAwesomeModule,
        NgOptimizedImage,
      ],
      providers: [SidebarToggleService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleMobileSider method on click', () => {
    spyOn(component, 'toggleMobileSider');
    const element =
      fixture.debugElement.nativeElement.querySelector('.fa-bars');
    element.click();
    expect(component.toggleMobileSider).toHaveBeenCalled();
  });
});
