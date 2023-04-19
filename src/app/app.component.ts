import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { AuthenticatedResponse } from './interfaces/authenticated-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  invalidLogin: boolean = true;
  title = 'NeverovLab2frontend';
  user = new User();

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  register(user: User) {
    this.authService.register(user)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  login(user: User) {
    this.authService.login(user).subscribe({
      next: (response: AuthenticatedResponse) => {
        localStorage.setItem("jwt", response.token); 
        localStorage.setItem("refreshToken", response.refreshToken);
        this.invalidLogin = false;
        this.loggedIn.next(true);
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response: AuthenticatedResponse) => {
        console.log();
        localStorage.removeItem('jwt');
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    });
    this.loggedIn.next(false);
  }  
}
