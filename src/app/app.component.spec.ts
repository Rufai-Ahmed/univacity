import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { MobileSiderComponent } from './mobile-sider/mobile-sider.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sidebarToggleService: SidebarToggleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        RouterTestingModule,
        SidebarComponent,
        CommonModule,
        HeaderComponent,
        NgOptimizedImage,
        FooterComponent,
        ContentComponent,
        MobileSiderComponent,
        AppComponent,
      ],
      providers: [SidebarToggleService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sidebarToggleService = TestBed.inject(SidebarToggleService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    component.toggleDarkMode(true);
    expect(component.isDarkMode).toBeTrue();
    component.toggleDarkMode(false);
    expect(component.isDarkMode).toBeFalse();
  });

  it('should toggle sidebar visibility on timer', (done) => {
    spyOn(sidebarToggleService.toggle$, 'subscribe').and.callFake(
      (callback: (isVisible: boolean) => void) => {
        setTimeout(() => callback(true), 100);
        return of(true).subscribe();
      }
    );
    component.ngOnInit();
    setTimeout(() => {
      expect(component.isShow).toBeTrue();
      done();
    }, 100);
  });

  it('should call toggleSidebarOff on toggleSidebar', () => {
    spyOn(sidebarToggleService, 'toggleSidebarOff');
    component.toggleSidebar();
    expect(sidebarToggleService.toggleSidebarOff).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
