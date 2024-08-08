import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FilterService } from '../services/filter-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterComponentComponent } from '../filter-component/filter-component.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        FilterComponentComponent,
        SidebarComponent,
      ],
      providers: [FilterService],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected filter and call filterService.setFilter when setFilter is called', () => {
    const testFilter = 'On Campus (50)';
    spyOn(filterService, 'setFilter');
    component.setFilter(testFilter);
    expect(component.selectedFilter).toBe(testFilter);
    expect(filterService.setFilter).toHaveBeenCalledWith(testFilter);
  });

  it('should calculate correct min percentage', () => {
    component.minValue = 6000;
    component.maxValue = 7000;
    const minPercent = component.getMinPercent();
    expect(minPercent).toBeCloseTo(((6000 - 5000) / (58000 - 5000)) * 100);
  });

  it('should calculate correct range width', () => {
    component.minValue = 6000;
    component.maxValue = 7000;
    const rangeWidth = component.getRangeWidth();
    expect(rangeWidth).toBeCloseTo(((7000 - 6000) / (58000 - 5000)) * 100);
  });

  it('should emit minValueChange event when minValue changes', () => {
    spyOn(component.minValueChange, 'emit');
    component.minValue = 6000;
    component.onMinValueChange();
    expect(component.minValueChange.emit).toHaveBeenCalledWith(6000);
  });

  it('should emit maxValueChange event when maxValue changes', () => {
    spyOn(component.maxValueChange, 'emit');
    component.maxValue = 7000;
    component.onMaxValueChange();
    expect(component.maxValueChange.emit).toHaveBeenCalledWith(7000);
  });
});
