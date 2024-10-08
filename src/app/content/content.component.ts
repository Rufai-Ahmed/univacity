import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeadingComponent } from '../app-heading/app-heading.component';
import { ContentCardComponent } from '../content-card/content-card.component';
import { CustomPaginationComponent } from '../custom-pagination/custom-pagination.component';
import data from '../../../public/assets/data/data.json';
import { FilterService } from '../services/filter-service.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule,
    AppHeadingComponent,
    ContentCardComponent,
    CustomPaginationComponent,
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  dataSource = CARDS;
  filteredData: Card[] = [];
  pagedData: Card[] = [];
  currentPage = 1;
  pageSize = 12;

  @Input() search: (term: string) => void = (term: string) => {
    console.log('Search term:', term);
  };

  constructor(private filterService: FilterService) {}
  ngOnInit() {
    this.filterService.filter$.pipe(debounceTime(300)).subscribe((filter) => {
      this.onSearch(filter);
      this.updatePagedData();
    });

    this.updatePagedData();
  }

  onSearch(searchTerm: string) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.filteredData = this.dataSource.filter(
      (card: Card) =>
        card.school.toLowerCase().includes(lowerCaseTerm) ||
        card.cardName.toLowerCase().includes(lowerCaseTerm) ||
        card.country.toLowerCase().includes(lowerCaseTerm) ||
        card.learning.toLowerCase().includes(lowerCaseTerm) ||
        card.date.toLowerCase().includes(lowerCaseTerm) ||
        card.amount.toLowerCase().includes(lowerCaseTerm) ||
        card.duration.toLowerCase().includes(lowerCaseTerm)
    );
    this.currentPage = 1;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }
}

export interface Card {
  image: string;
  school: string;
  country: string;
  cardName: string;
  learning: string;
  available: boolean;
  date: string;
  allCountry: string[];
  duration: string;
  amount: string;
  verified: boolean;
  length: number;
}

export const CARDS: Card[] = [
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
  ...data,
];
