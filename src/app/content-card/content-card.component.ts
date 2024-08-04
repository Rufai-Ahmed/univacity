import { Component, Input } from '@angular/core';
import { Card, CARDS } from '../content/content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent {
  @Input() card: Card | undefined;
  toggle: boolean = false;

  changeToggle: () => void = () => (this.toggle = !this.toggle);
}
