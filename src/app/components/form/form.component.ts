import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../../core/services/users/users.service';
import { CpfMaskDirective } from '../../core/utils/directives/cpf-mask.directive';
import { PhoneMaskDirective } from '../../core/utils/directives/phone-mask.directive';
import { stripNonDigits } from '../../core/utils/others/format.util';
import { AlertService } from '../../core/services/alert/alert.service';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CpfMaskDirective,
    PhoneMaskDirective,
    NgClass
  ]
})
export class FormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  focused = {
    name: false,
    cpf: false,
    phone: false,
    email: false
  };

  isLading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) { }

  submit(): void {
    if (this.form.valid) {
      this.isLading = true;

      const { name, cpf, phone, email } = this.form.value;

      this.form.disable();

      setTimeout(() => {
        this.form.reset();

        this.userService.addUser({
          name: name ?? '',
          cpf: stripNonDigits(cpf ?? ''),
          phone: stripNonDigits(phone ?? ''),
          email: email ?? ''
        });

        this.alertService.success(
          'Usuário adicionado com sucesso!',
          4000
        );

        this.form.enable();
        this.isLading = false;
      }, 3000);
    }
  }
}