import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FilterService } from './filter-service.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService],
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the correct filter value', fakeAsync(() => {
    const testFilter = 'Test Filter';
    let emittedValue: string | undefined;

    service.filter$.subscribe((value) => {
      emittedValue = value;
    });

    service.setFilter(testFilter);
    tick();

    expect(emittedValue).toBe(testFilter);
  }));
});
