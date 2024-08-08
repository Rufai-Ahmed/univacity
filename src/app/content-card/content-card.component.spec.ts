import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentCardComponent } from './content-card.component';
import { Card } from '../content/content.component'; // Adjust import based on your project structure
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

describe('ContentCardComponent', () => {
  let component: ContentCardComponent;
  let fixture: ComponentFixture<ContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardComponent, NgOptimizedImage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card data', () => {
    const card: Card = {
      image: 'content_one.png',
      school: 'Harvard',
      country: 'USA',
      cardName: 'Card Name',
      learning: 'Hybrid',
      available: true,
      date: '2024-01-01',
      allCountry: ['ENG', 'ESP'],
      duration: '6 months',
      amount: '500',
      verified: true,
      length: 10,
    };

    component.card = card;
    fixture.detectChanges();

    const schoolElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(schoolElement.textContent).toContain('Harvard');
  });

  it('should toggle heart icon color on click', () => {
    const initialColor = fixture.debugElement.query(By.css('.fa-heart'))
      .nativeElement.className;

    component.changeToggle();
    fixture.detectChanges();

    const toggledColor = fixture.debugElement.query(By.css('.fa-heart'))
      .nativeElement.className;
    expect(toggledColor).not.toEqual(initialColor);
  });
});
