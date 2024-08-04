import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeadingComponent } from '../app-heading/app-heading.component';
import { ContentCardComponent } from '../content-card/content-card.component';
import { CustomPaginationComponent } from '../custom-pagination/custom-pagination.component';
import data from '../../../public/assets/data/data.json';

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

  ngOnInit() {
    this.filteredData = this.dataSource;
    this.updatePagedData();
  }

  onSearch(searchTerm: string) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.filteredData = this.dataSource.filter(
      (card) =>
        card.school.toLowerCase().includes(lowerCaseTerm) ||
        card.cardName.toLowerCase().includes(lowerCaseTerm) ||
        card.country.toLowerCase().includes(lowerCaseTerm)
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
