import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHeadingComponent } from './app-heading.component';
import { FilterService } from '../services/filter-service.service';
import { of } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

describe('AppHeadingComponent', () => {
  let component: AppHeadingComponent;
  let fixture: ComponentFixture<AppHeadingComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeadingComponent, NgOptimizedImage],
      providers: [
        {
          provide: FilterService,
          useValue: { setFilter: jasmine.createSpy('setFilter') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeadingComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterService.setFilter on search', () => {
    const searchTerm = 'test';
    const event = { target: { value: searchTerm } } as unknown as Event;

    component.onSearch(event);

    expect(filterService.setFilter).toHaveBeenCalledWith(searchTerm);
  });

  it('should call filterService.setFilter with parsed filter from localStorage', () => {
    const filter = 'testFilter';
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(filter));

    component.getFilter();

    expect(filterService.setFilter).toHaveBeenCalledWith(filter);
  });

  it('should handle errors when parsing filter from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{invalidJson}');
    spyOn(console, 'error');

    component.getFilter();

    expect(console.error).toHaveBeenCalledWith(
      'Error parsing filter from localStorage',
      jasmine.any(SyntaxError)
    );
  });
});
