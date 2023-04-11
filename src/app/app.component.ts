import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        console.log(token);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getme() {
    this.authService.getMe().subscribe((name: string) => {
      console.log(name);
    });
  }
}
