import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter-service.service';

@Component({
  selector: 'app-app-heading',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss'],
})
export class AppHeadingComponent implements OnInit {
  searchTerm: string = '';

  constructor(private filterService: FilterService) {}

  @Input() search: (term: string) => void = (term: string) => {
    console.log('Search term:', term);
  };

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setFilter(input.value);
  }

  getFilter() {
    const filter = localStorage.getItem('filter');
    if (filter) {
      try {
        this.filterService.setFilter(JSON.parse(filter));
      } catch (e) {
        console.error('Error parsing filter from localStorage', e);
      }
    }
  }

  ngOnInit() {
    this.getFilter();
  }
}
