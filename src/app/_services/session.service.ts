import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private userService: UserService) {
    this.loadUser();
  }

  loginSubject = new BehaviorSubject<boolean>(false);
  loginUser = new BehaviorSubject<User>(new User);

  getLoggedUser() {
    return this.loginUser.asObservable();
  }

  loadUser() {
    if (localStorage.getItem('userId')) {
      this.userService.getById(localStorage.getItem('userId')!).subscribe(
        res => this.loginUser.next(res),
        console.log
      );
    }
  }

  isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('userId')) {
      this.loginSubject.next(true);
    }
    return this.loginSubject.asObservable();
  }

  login(id: string, token: string): void {
    localStorage.setItem('userId', id);
    localStorage.setItem('token', token);
    this.loadUser();
    this.loginSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.loginUser.next(new User());
    this.loginSubject.next(false);
  }
}
