import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-heading',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss'],
})
export class AppHeadingComponent {
  searchTerm: string = '';
  @Input() search: (term: string) => void = () => '';

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search(input.value);
  }
}
