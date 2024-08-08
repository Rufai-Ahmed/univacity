import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileSiderComponent } from './mobile-sider.component';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { FilterService } from '../services/filter-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponentComponent } from '../filter-component/filter-component.component';

describe('MobileSiderComponent', () => {
  let component: MobileSiderComponent;
  let fixture: ComponentFixture<MobileSiderComponent>;
  let sidebarToggleService: SidebarToggleService;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, FilterComponentComponent],
      providers: [SidebarToggleService, FilterService],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSiderComponent);
    component = fixture.componentInstance;
    sidebarToggleService = TestBed.inject(SidebarToggleService);
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar visibility', () => {
    spyOn(component, 'toggleSideBar');
    const element =
      fixture.debugElement.nativeElement.querySelector('.fa-xmark');
    element.click();
    expect(component.toggleSideBar).toHaveBeenCalled();
  });

  it('should update filter when setFilter is called', () => {
    const testFilter = 'On Campus (50)';
    spyOn(filterService, 'setFilter');
    component.setFilter(testFilter);
    expect(filterService.setFilter).toHaveBeenCalledWith(testFilter);
    expect(component.selectedFilter).toBe(testFilter);
  });

  it('should calculate correct percentage for minValue', () => {
    component.minValue = 6000;
    component.maxValue = 7000;
    const minPercent = component.getMinPercent();
    expect(minPercent).toBeCloseTo(((6000 - 5000) / (58000 - 5000)) * 100);
  });

  it('should calculate correct width for range', () => {
    component.minValue = 6000;
    component.maxValue = 7000;
    const rangeWidth = component.getRangeWidth();
    expect(rangeWidth).toBeCloseTo(((7000 - 6000) / (58000 - 5000)) * 100);
  });

  it('should emit minValueChange event on min value change', () => {
    spyOn(component.minValueChange, 'emit');
    component.onMinValueChange();
    expect(component.minValueChange.emit).toHaveBeenCalledWith(
      component.minValue
    );
  });

  it('should emit maxValueChange event on max value change', () => {
    spyOn(component.maxValueChange, 'emit');
    component.onMaxValueChange();
    expect(component.maxValueChange.emit).toHaveBeenCalledWith(
      component.maxValue
    );
  });
});
