import { Component } from '@angular/core';
import { iFooter } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footData: iFooter[] = [
    {
      label: 'Products',
      navs: ['Univacity', 'Univisa', 'Uniflight', 'Unishop'],
    },
    {
      label: 'Resources',
      navs: ['Blog', 'Help Center', 'Pricing'],
    },
    {
      label: 'Company',
      navs: ['About', 'Subscribe', 'Contact us', 'careers', 'media kit'],
    },
    {
      label: 'Contact',
      navs: ['+236 251 881 9917', 'hello@univacity.com'],
    },
  ];
}
