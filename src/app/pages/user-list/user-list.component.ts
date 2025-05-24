import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListComponent } from '../../components/list/list.component';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users$: Observable<User[]> = this.userService.getUsers();

  constructor(private userService: UserService) { }

  remove(cpf: string): void {
    this.userService.removeUser(cpf);
  }

}
