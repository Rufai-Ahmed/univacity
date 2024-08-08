import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter-service.service';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-app-heading',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss'],
})
export class AppHeadingComponent {
  searchTerm: string = '';

  constructor(
    private filterService: FilterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Input() search: (term: string) => void = (term: string) => {
    console.log('Search term:', term);
  };

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setFilter(input.value);
  }

  getFilter() {
    if (isPlatformBrowser(this.platformId)) {
      const filter = localStorage.getItem('filter');
      if (filter) {
        try {
          this.filterService.setFilter(JSON.parse(filter));
        } catch (e) {
          console.error('Error parsing filter from localStorage', e);
        }
      }
    }
  }
}
