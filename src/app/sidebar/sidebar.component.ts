import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FilterComponentComponent } from '../filter-component/filter-component.component';
import { iFilter } from '../../../interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FilterComponentComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
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

  @Output() filtersChanged = new EventEmitter<string[]>();

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

  sliderRange: number[] = [5000, 58000];
  minPrice: number = 5000;
  maxPrice: number = 58000;

  onSliderChange(event: any) {
    this.minPrice = this.sliderRange[0];
    this.maxPrice = this.sliderRange[1];
  }
}
