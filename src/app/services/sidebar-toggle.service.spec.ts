import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SidebarToggleService } from './sidebar-toggle.service';

describe('SidebarToggleService', () => {
  let service: SidebarToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarToggleService],
    });
    service = TestBed.inject(SidebarToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle sidebar visibility', fakeAsync(() => {
    let isToggled = false;
    service.toggle$.subscribe((value) => {
      isToggled = value;
    });

    service.toggleSidebar(true);
    tick();

    expect(isToggled).toBe(true);
  }));

  it('should toggle sidebar visibility to off', fakeAsync(() => {
    let isToggled = true;
    service.toggle$.subscribe((value) => {
      isToggled = value;
    });

    service.toggleSidebarOff();
    tick();

    expect(isToggled).toBe(false);
  }));

  it('should toggle sidebar visibility when called without argument', fakeAsync(() => {
    let isToggled = false;
    service.toggle$.subscribe((value) => {
      isToggled = value;
    });

    service.toggleSidebar(true);
    tick();

    service.toggleSidebar();
    tick();

    expect(isToggled).toBe(false);
  }));
});
