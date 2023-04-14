import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { AuthenticatedResponse } from './interfaces/authenticated-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  invalidLogin: boolean = true;
  title = 'NeverovLab2frontend';
  user = new User();

  constructor(private authService: AuthService) {}

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
        const token = response.token;
        const refreshToken = response.refreshToken;
        localStorage.setItem("jwt", token); 
        localStorage.setItem("refreshToken", refreshToken);
        this.invalidLogin = false;
        console.log(token);
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    });
  }

  
}
