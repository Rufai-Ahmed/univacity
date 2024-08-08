import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iNavData } from '../../../interfaces';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navItems: iNavData[] = [
    { path: '/products', label: 'Products' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/resources', label: 'Resources' },
    { path: '/ourcompany', label: 'Our Company' },
  ];

  otherItems: iNavData[] = [
    {
      icon: 'assets/images/dashboard.png',
      label: 'dashboard',
    },
    {
      icon: 'assets/images/application.png',
      label: 'applications',
    },
    {
      icon: 'assets/images/bookings.png',
      label: 'bookings',
    },
    {
      icon: 'assets/images/payment.png',
      label: 'payment',
    },
    {
      icon: 'assets/images/setting.png',
      label: 'settings',
    },
  ];

  constructor(private sidebarToggleService: SidebarToggleService) {}

  toggleMobileSider() {
    this.sidebarToggleService.toggleSidebar();
  }
}
