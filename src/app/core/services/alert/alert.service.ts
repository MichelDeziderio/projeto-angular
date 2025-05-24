import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  type: AlertType;
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alerts$ = this.alertSubject.asObservable();

  show(type: AlertType, message: string, duration?: number) {
    this.alertSubject.next({ type, message, duration });
  }

  success(msg: string, duration?: number) {
    this.show('success', msg, duration);
  }

  error(msg: string, duration?: number) {
    this.show('error', msg, duration);
  }

  warning(msg: string, duration?: number) {
    this.show('warning', msg, duration);
  }

  info(msg: string, duration?: number) {
    this.show('info', msg, duration);
  }
}
