import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterService } from '../services/filter-service.service';
import { iFilter } from '../../../interfaces';
import { FilterComponentComponent } from '../filter-component/filter-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FilterComponentComponent, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() min: number = 5000;
  @Input() max: number = 58000;

  minValue: number = 5000;
  maxValue: number = 58000;

  @Output() minValueChange = new EventEmitter<number>();
  @Output() maxValueChange = new EventEmitter<number>();

  onMinValueChange() {
    this.minValueChange.emit(this.minValue);
  }

  onMaxValueChange() {
    this.maxValueChange.emit(this.maxValue);
  }

  ngOnInit() {}

  getMinPercent(): number {
    return ((this.minValue - this.min) / (this.max - this.min)) * 100;
  }

  getRangeWidth(): number {
    return ((this.maxValue - this.minValue) / (this.max - this.min)) * 100;
  }

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
    'European Institute of Innovation (51)',
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
    { data: this.countries, name: 'Country', search: 'countries' },
    { data: this.institutes, name: 'Institutes', search: 'institutes' },
    { data: this.languages, name: 'Languages', search: 'languages' },
    { data: this.levels, name: 'Level' },
    { data: this.type, name: 'Type' },
    { data: this.duration, name: 'Duration' },
  ];

  sliderRange: number[] = [5000, 58000];
  minPrice: number = 5000;
  maxPrice: number = 58000;

  selectedFilter: string = '';

  constructor(private filterService: FilterService) {}

  setFilter(item: string) {
    this.selectedFilter = item;
    this.filterService.setFilter(item);
  }
}
