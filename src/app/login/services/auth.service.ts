import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: User = {
    username: 'admin',
    password: '1234'
  }

  constructor(private router: Router) {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('login status: '+ localStorage.getItem('loginStatus'));
  }

  login(userCreds: User): void {
    if (_.isEqual(userCreds, this.admin)) {
      localStorage.setItem('loginStatus', 'true');
      this.router.navigate(['/dashboard']);
    }
  }

  isloggedIn(): void {
    if (JSON.parse(localStorage.getItem('loginStatus') || 'false')) {
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    localStorage.setItem('loginStatus', 'false');
    this.router.navigate(['/login']);
  }
}
