import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomPaginationComponent } from './custom-pagination.component';

describe('CustomPaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    component.totalItems = 360;
    component.pageSize = 12;
    expect(component.totalPages).toBe(30);
  });

  it('should generate pages array correctly for different scenarios', () => {
    component.totalItems = 360;
    component.pageSize = 25;

    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2, 3, 4, 5, '...', 15]);

    component.currentPage = 5;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, '...', 4, 5, 6, '...', 15]);

    component.currentPage = 9;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, '...', 8, 9, 10, '...', 15]);

    component.totalItems = 30;
    component.pageSize = 5;
    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2, 3, 4, 5, 6]);

    component.totalItems = 15;
    component.pageSize = 10;
    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2]);
  });

  it('should emit pageChange event when a page button is clicked', () => {
    spyOn(component.pageChange, 'emit');

    component.currentPage = 1;
    component.totalItems = 50;
    component.pageSize = 10;
    fixture.detectChanges();

    const nextButton = fixture.nativeElement.querySelector(
      'button:last-of-type'
    );
    nextButton.click();
    fixture.detectChanges();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);

    const prevButton = fixture.nativeElement.querySelector(
      'button:first-of-type'
    );
    prevButton.click();
    fixture.detectChanges();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should disable buttons appropriately', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.nativeElement.querySelector(
      'button:first-of-type'
    );
    expect(prevButton.disabled).toBe(true);

    component.currentPage = component.totalPages;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector(
      'button:last-of-type'
    );
    expect(nextButton.disabled).toBe(true);
  });
});
