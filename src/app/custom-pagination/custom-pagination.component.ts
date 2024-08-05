import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Renderer2,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  standalone: true,
  styleUrls: ['./custom-pagination.component.scss'],
  imports: [CommonModule],
})
export class CustomPaginationComponent implements OnInit {
  isDarkMode = false;

  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): (number | string)[] {
    const totalPages = this.totalPages;
    const pages: (number | string)[] = [];
    const delta = 5;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (this.currentPage > delta + 2) {
        pages.push(-1);
      }

      for (
        let i = Math.max(2, this.currentPage - delta);
        i <= Math.min(totalPages - 1, this.currentPage + delta);
        i++
      ) {
        pages.push(i);
      }

      if (this.currentPage < totalPages - delta - 1) {
        pages.push(-1);
      }

      pages.push(totalPages);
    }

    return pages;
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
