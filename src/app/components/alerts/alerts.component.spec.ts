import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import { AlertService, Alert } from '../../core/services/alert/alert.service';
import { of, Subject } from 'rxjs';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertService: jasmine.SpyObj<AlertService>;
  let alertsSubject: Subject<Alert>;

  beforeEach(async () => {
    alertsSubject = new Subject<Alert>();
    const alertServiceSpy = jasmine.createSpyObj('AlertService', [], {
      alerts$: alertsSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [AlertsComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add alert to alerts array when alert is emitted', () => {
    const alert: Alert = { type: 'success', message: 'Test', duration: 100 };
    alertsSubject.next(alert);
    expect(component.alerts).toContain(alert);
  });

  it('should remove alert after duration', (done) => {
    const alert: Alert = { type: 'success', message: 'Test', duration: 10 };
    alertsSubject.next(alert);
    expect(component.alerts).toContain(alert);
    setTimeout(() => {
      expect(component.alerts).not.toContain(alert);
      done();
    }, 50);
  });

  it('should remove alert when close is called', () => {
    const alert: Alert = { type: 'error', message: 'Error', duration: 1000 };
    component.alerts = [alert];
    spyOn(document, 'querySelectorAll').and.returnValue([] as any);
    component.close(alert);
    expect(component.alerts).not.toContain(alert);
  });

  it('should add fade-out class and remove alert after 300ms if alert element exists', (done) => {
    const alert: Alert = { type: 'info', message: 'Info', duration: 1000 };
    component.alerts = [alert];
    const fakeElement = document.createElement('div');
    fakeElement.classList.add('alert');
    spyOn(document, 'querySelectorAll').and.returnValue([fakeElement] as any);
    component.close(alert);
    expect(fakeElement.classList.contains('fade-out')).toBeTrue();
    setTimeout(() => {
      expect(component.alerts).not.toContain(alert);
      done();
    }, 350);
  });

  it('should return correct icon class for each alert type', () => {
    expect(component.getIcon('success')).toBe('fas fa-check-circle');
    expect(component.getIcon('error')).toBe('fas fa-times-circle');
    expect(component.getIcon('warning')).toBe('fas fa-exclamation-triangle');
    expect(component.getIcon('info')).toBe('fas fa-info-circle');
    expect(component.getIcon('other')).toBe('');
  });

  it('should return correct alert title for each alert type', () => {
    expect(component.alertTilte('success')).toBe('Sucesso');
    expect(component.alertTilte('error')).toBe('Erro');
    expect(component.alertTilte('warning')).toBe('Alerta');
    expect(component.alertTilte('info')).toBe('Informação');
    expect(component.alertTilte('other')).toBe('');
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['sub'].unsubscribe).toHaveBeenCalled();
  });
});