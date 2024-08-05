import { Component, AfterViewInit, OnInit, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { MobileSiderComponent } from './mobile-sider/mobile-sider.component';
import { timer } from 'rxjs';
import { SidebarToggleService } from './services/sidebar-toggle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    CommonModule,
    HeaderComponent,
    NgOptimizedImage,
    FooterComponent,
    ContentComponent,
    MobileSiderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Univacity';

  selectedFilters: string[] = [];

  onFiltersChanged(filters: string[]) {
    this.selectedFilters = filters;
  }

  timer: any;

  isDarkMode: boolean = false;

  toggleDarkMode: (theme: boolean) => void = (theme: boolean) =>
    (this.isDarkMode = theme);

  isShow: boolean = false;

  constructor(
    private ngZone: NgZone,
    private mobileToggle: SidebarToggleService
  ) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.isShow = true;
        });
      }, 6000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  toggleSidebar = (value: boolean) => this.mobileToggle.toggleSidebar(value);
}
