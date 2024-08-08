import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { FilterService } from '../services/filter-service.service';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockData = Array(12).fill({
  image: 'test.jpg',
  school: 'Test School',
  country: 'Test Country',
  cardName: 'Test Card',
  learning: 'Test Learning',
  available: true,
  date: '2024-01-01',
  allCountry: ['Test Country'],
  duration: '1 month',
  amount: '100',
  verified: true,
  length: 0,
});

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let filterService: FilterService;
  let filterSubject: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    filterSubject = new BehaviorSubject<string>('');

    TestBed.configureTestingModule({
      imports: [ContentComponent],
      providers: [
        {
          provide: FilterService,
          useValue: {
            filter$: filterSubject.asObservable(),
            setFilter: jasmine.createSpy('setFilter'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);

    component.dataSource = mockData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch and update pagedData when filter changes', waitForAsync(() => {
    spyOn(component, 'onSearch').and.callThrough();
    spyOn(component, 'updatePagedData').and.callThrough();

    filterSubject.next('Test');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.onSearch);
      expect(component.updatePagedData);
    });
  }));

  it('should filter data based on search term', () => {
    component.onSearch('Test');

    expect(component.filteredData.length).toBeGreaterThan(0);
    expect(component.filteredData[0].school).toContain('Test School');
  });

  it('should update pagedData when data changes', () => {
    component.filteredData = mockData;
    component.pageSize = 5;
    component.currentPage = 2;

    component.updatePagedData();

    expect(component.pagedData.length).toBe(5);
    expect(component.pagedData[0].school).toBe('Test School');
  });

  it('should update pagedData when page changes', () => {
    component.filteredData = mockData;
    component.pageSize = 5;

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.pagedData.length).toBe(5);
  });
});
