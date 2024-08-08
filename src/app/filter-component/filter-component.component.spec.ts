import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponentComponent } from './filter-component.component';
import { CommonModule } from '@angular/common';
import { FilterService } from '../services/filter-service.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { of } from 'rxjs';

describe('FilterComponentComponent', () => {
  let component: FilterComponentComponent;
  let fixture: ComponentFixture<FilterComponentComponent>;
  let filterService: jasmine.SpyObj<FilterService>;
  let sidebarToggleService: jasmine.SpyObj<SidebarToggleService>;

  beforeEach(async () => {
    const filterServiceSpy = jasmine.createSpyObj('FilterService', [
      'setFilter',
    ]);
    const sidebarToggleServiceSpy = jasmine.createSpyObj(
      'SidebarToggleService',
      ['toggleSidebar']
    );

    await TestBed.configureTestingModule({
      imports: [FilterComponentComponent, CommonModule],
      providers: [
        { provide: FilterService, useValue: filterServiceSpy },
        { provide: SidebarToggleService, useValue: sidebarToggleServiceSpy },
      ],
    }).compileComponents();

    filterService = TestBed.inject(
      FilterService
    ) as jasmine.SpyObj<FilterService>;
    sidebarToggleService = TestBed.inject(
      SidebarToggleService
    ) as jasmine.SpyObj<SidebarToggleService>;

    fixture = TestBed.createComponent(FilterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle item selection', () => {
    const item = 'Item 1';
    component.toggleItem(item);
    expect(component.selectedItems.has(item)).toBeTrue();
    expect(filterService.setFilter).toHaveBeenCalledWith(item);

    component.toggleItem(item);
    expect(component.selectedItems.has(item)).toBeFalse();
    expect(filterService.setFilter).toHaveBeenCalledWith('');
  });

  it('should correctly determine if an item is checked', () => {
    const item = 'Item 1';
    component.toggleItem(item);
    expect(component.isChecked(item)).toBeTrue();

    component.toggleItem(item);
    expect(component.isChecked(item)).toBeFalse();
  });

  it('should call toggleSidebar on sidebarToggleService when toggling item', () => {
    const item = 'Item 1';
    component.toggleItem(item);
    expect(sidebarToggleService.toggleSidebar).toHaveBeenCalled();
  });

  it('should initialize with the correct data and inputs', () => {
    component.data = ['Item 1', 'Item 2'];
    component.name = 'Test Name';
    component.search = 'Search Term';
    fixture.detectChanges();

    expect(component.data).toEqual(['Item 1', 'Item 2']);
    expect(component.name).toBe('Test Name');
    expect(component.search).toBe('Search Term');
  });

  it('should update the input value in the search field correctly', () => {
    component.search = 'Search Term';
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector(
      'input[type="search"]'
    );
    expect(inputElement.placeholder).toBe('Search Search Term');
  });

  it('should have correct class bindings for dark mode', () => {
    const hostElement = fixture.nativeElement.querySelector('div');
    expect(hostElement.classList).toContain('dark:bg-dark-background');
    expect(hostElement.classList).toContain('dark:text-dark-text');
  });
});
