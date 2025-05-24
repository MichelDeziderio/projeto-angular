import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService } from '../../core/services/alert/alert.service';


@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnDestroy {

  alerts: Alert[] = [];
  private sub = new Subscription();

  constructor(private alertService: AlertService) {
    this.sub = this.alertService.alerts$.subscribe((alert) => {
      this.alerts.push(alert);
      setTimeout(() => this.close(alert), alert.duration || 5000);
    });
  }

  close(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    const alertElements = document.querySelectorAll('.alert');
    const alertElement = alertElements[index] as HTMLElement;

    if (alertElement) {
      alertElement.classList.add('fade-out');
      setTimeout(() => {
        this.alerts = this.alerts.filter((a) => a !== alert);
      }, 300);
    } else {
      this.alerts = this.alerts.filter((a) => a !== alert);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getIcon(type: string) {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-times-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return '';
    }
  }

  alertTilte(type: string): string {
    switch (type) {
      case 'success':
        return 'Sucesso';
      case 'error':
        return 'Erro';
      case 'warning':
        return 'Alerta';
      case 'info':
        return 'Informação';
      default:
        return '';
    }
  }

}
