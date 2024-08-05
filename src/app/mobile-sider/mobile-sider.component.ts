import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FilterComponentComponent } from '../filter-component/filter-component.component';
import { iFilter } from '../../../interfaces';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { FilterService } from '../services/filter-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-sider',
  standalone: true,
  imports: [CommonModule, FilterComponentComponent, FormsModule],
  templateUrl: './mobile-sider.component.html',
  styleUrls: ['./mobile-sider.component.scss'],
})
export class MobileSiderComponent implements OnInit {
  value: { min: number; max: number } = { min: 5000, max: 5800 };

  toggle: boolean = false;
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

  ngOnInit() {
    this.mobileSiderToggle.toggle$.subscribe(
      (isOpen) => (this.toggle = isOpen)
    );
  }

  getMinPercent(): number {
    return ((this.minValue - this.min) / (this.max - this.min)) * 100;
  }

  getRangeWidth(): number {
    return ((this.maxValue - this.minValue) / (this.max - this.min)) * 100;
  }

  constructor(
    private mobileSiderToggle: SidebarToggleService,
    private filterService: FilterService
  ) {}

  selectedFilter: string = '';

  setFilter(item: string) {
    this.selectedFilter = item;
    this.filterService.setFilter(item);
    this.toggleSideBar();
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

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }
}
