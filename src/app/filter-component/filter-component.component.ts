import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-component.component.html',
  styleUrl: './filter-component.component.scss',
})
export class FilterComponentComponent {
  @Input() data: string[] = [];
  @Input() name: string = '';
  @Input() search: string = '';
}
