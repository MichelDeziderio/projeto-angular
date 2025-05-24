import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { CpfFormatPipe } from '../../core/utils/pipes/cpf-format.pipe';
import { PhoneFormatPipe } from '../../core/utils/pipes/phone-format.pipe';
import { AlertService } from '../../core/services/alert/alert.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CpfFormatPipe,
    PhoneFormatPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  constructor(private alertService: AlertService) { }

  @Input() users: User[] | null = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() removeUser = new EventEmitter<string>();

  searchTerm = '';

  modeView: 'list' | 'grid' = 'list';

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onRemove(cpf: string): void {
    this.removeUser.emit(cpf);

    this.alertService.success(
      'Usuário excluido com sucesso!',
      8000
    );
  }

  filteredUsers(): User[] {
    const term = this.searchTerm.toLowerCase();
    return (this.users ?? []).filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  toggleView(): void {
    this.modeView = this.modeView === 'list' ? 'grid' : 'list';
  }

}