import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterComponentComponent } from '../filter-component/filter-component.component';
import { iFilter } from '../../../interfaces';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Component({
  selector: 'app-mobile-sider',
  standalone: true,
  imports: [CommonModule, FilterComponentComponent],
  templateUrl: './mobile-sider.component.html',
  styleUrl: './mobile-sider.component.scss',
})
export class MobileSiderComponent implements OnInit {
  toggle: boolean = false;

  constructor(private mobileSiderToggle: SidebarToggleService) {}

  ngOnInit() {
    this.mobileSiderToggle.toggle$.subscribe(
      (isOpen) => (this.toggle = isOpen)
    );
  }
  toggleSideBar: () => void = () => this.mobileSiderToggle.toggleSidebar();

  sideBarItem: string[] = ['On Campus (50)', 'Hybrid (20)', 'E-Learning (120)'];

  countries: string[] = [
    'Angola (20)',
    'Belgium (20)',
    'Egypt (120)',
    'Finland (11)',
    'Mexico (23)',
  ];
  institutes: string[] = [
    'Columbia (23)',
    'Brown University (11)',
    'European Institute of Innov... (51)',
    'Harvard University (20)',
    'New York University (12)',
  ];
  languages: string[] = [
    'Arabic (23)',
    'Chinese (12)',
    'English (11)',
    'German (51)',
    'Spanish (12)',
  ];
  levels: string[] = [
    'Associate (50)',
    'Undergraduate (20)',
    'Post Graduate (120)',
    'Masters (32)',
    'PHD (61)',
  ];
  type: string[] = ['Full Time (20)', 'Part Time (61)'];
  duration: string[] = [
    '6 - 12 Months (20)',
    '1 - 3 Years (61)',
    '3 - 5 Years (182)',
  ];

  filterData: iFilter[] = [
    {
      data: this.countries,
      name: 'Country',
      search: 'countries',
    },
    {
      data: this.institutes,
      name: 'Institutes',
      search: 'institutes',
    },
    {
      data: this.languages,
      name: 'Languages',
      search: 'languages',
    },
    {
      data: this.levels,
      name: 'Level',
    },
    {
      data: this.type,
      name: 'Type',
    },
    {
      data: this.duration,
      name: 'Duration',
    },
  ];
}
