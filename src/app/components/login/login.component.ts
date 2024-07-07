import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = { email: this.email, password: this.password };

    this.authService.login(user).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/bookings']); 
      },
      error: (error) => {
        console.error(error);
        this.errorMsg = error.error?.msg || 'Server Error';
      }
    });
  }
}
