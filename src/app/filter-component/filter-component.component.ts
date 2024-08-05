import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterService } from '../services/filter-service.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Component({
  selector: 'app-filter-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss'],
})
export class FilterComponentComponent {
  @Input() data: string[] = [];
  @Input() name: string = '';
  @Input() search: string = '';

  selectedItems: Set<string> = new Set();

  constructor(
    private filterService: FilterService,
    private mobileSiderToggle: SidebarToggleService
  ) {}

  toggleSideBar = () => this.mobileSiderToggle.toggleSidebar();

  toggleItem(item: string) {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }

    this.filterService.setFilter(Array.from(this.selectedItems).join(', '));
    this.toggleSideBar();
  }

  isChecked(item: string): boolean {
    return this.selectedItems.has(item);
  }
}
