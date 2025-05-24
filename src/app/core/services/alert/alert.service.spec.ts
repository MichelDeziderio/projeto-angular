import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a success alert', (done) => {
    service.alerts$.subscribe(alert => {
      expect(alert.type).toBe('success');
      expect(alert.message).toBe('Success message');
      expect(alert.duration).toBe(3000);
      done();
    });
    service.success('Success message', 3000);
  });

  it('should emit an error alert', (done) => {
    service.alerts$.subscribe(alert => {
      expect(alert.type).toBe('error');
      expect(alert.message).toBe('Error message');
      expect(alert.duration).toBeUndefined();
      done();
    });
    service.error('Error message');
  });

  it('should emit a warning alert', (done) => {
    service.alerts$.subscribe(alert => {
      expect(alert.type).toBe('warning');
      expect(alert.message).toBe('Warning message');
      expect(alert.duration).toBe(1000);
      done();
    });
    service.warning('Warning message', 1000);
  });

  it('should emit an info alert', (done) => {
    service.alerts$.subscribe(alert => {
      expect(alert.type).toBe('info');
      expect(alert.message).toBe('Info message');
      expect(alert.duration).toBeUndefined();
      done();
    });
    service.info('Info message');
  });

  it('should emit alert with show()', (done) => {
    service.alerts$.subscribe(alert => {
      expect(alert.type).toBe('error');
      expect(alert.message).toBe('Custom error');
      expect(alert.duration).toBe(500);
      done();
    });
    service.show('error', 'Custom error', 500);
  });
});
