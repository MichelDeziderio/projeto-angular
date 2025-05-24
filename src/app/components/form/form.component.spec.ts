import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../core/services/users/users.service';
import { AlertService } from '../../core/services/alert/alert.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['success']);

    await TestBed.configureTestingModule({
      imports: [FormComponent, HttpClientModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        FormBuilder
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({ name: '', cpf: '', phone: '', email: '' });
    component.submit();
    expect(component.isLading).toBeFalse();
    expect(userServiceSpy.addUser).not.toHaveBeenCalled();
    expect(alertServiceSpy.success).not.toHaveBeenCalled();
  });

  it('should submit valid form and call services', fakeAsync(() => {
    component.form.setValue({
      name: 'John Doe',
      cpf: '123.456.789-00',
      phone: '(11) 91234-5678',
      email: 'john@example.com'
    });

    spyOn(component.form, 'disable').and.callThrough();
    spyOn(component.form, 'enable').and.callThrough();
    spyOn(component.form, 'reset').and.callThrough();

    component.submit();

    expect(component.isLading).toBeTrue();
    expect(component.form.disable).toHaveBeenCalled();

    tick(3000);

    expect(component.form.reset).toHaveBeenCalled();
    expect(userServiceSpy.addUser).toHaveBeenCalledWith({
      name: 'John Doe',
      cpf: '12345678900',
      phone: '11912345678',
      email: 'john@example.com'
    });
    expect(alertServiceSpy.success).toHaveBeenCalledWith(
      'Usuário adicionado com sucesso!',
      4000
    );
    expect(component.form.enable).toHaveBeenCalled();
    expect(component.isLading).toBeFalse();
  }));
});