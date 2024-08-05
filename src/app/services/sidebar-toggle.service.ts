import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarToggleService {
  private toggleSource = new BehaviorSubject<boolean>(false);

  toggle$ = this.toggleSource.asObservable();

  toggleSidebarOff() {
    this.toggleSource.next(false);
  }
  toggleSidebar(visible?: boolean) {
    this.toggleSource.next(
      visible !== undefined ? visible : !this.toggleSource.value
    );
  }
}
