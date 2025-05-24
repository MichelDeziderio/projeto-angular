import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private localKey = 'tinnova-users';
  private users$ = new BehaviorSubject<User[]>([]);
  private apiUrl = 'https://private-9d65b3-tinnova.apiary-mock.com/users';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private http: HttpClient) {
    this.init();
  }

  private init(): void {
    if (!this.isBrowser) return;

    const localUsers = localStorage.getItem(this.localKey);
    if (localUsers) {
      this.users$.next(JSON.parse(localUsers));
    } else {
      this.http.get<User[]>(this.apiUrl).pipe(
        tap(users => this.saveToLocal(users))
      ).subscribe(users => this.users$.next(users));
    }
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  addUser(user: User): void {
    const current = [...this.users$.getValue(), user];
    this.saveToLocal(current);
    this.users$.next(current);
  }

  removeUser(cpf: string): void {
    const filtered = this.users$.getValue().filter(u => u.cpf !== cpf);
    this.saveToLocal(filtered);
    this.users$.next(filtered);
  }

  private saveToLocal(users: User[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.localKey, JSON.stringify(users));
  }
}