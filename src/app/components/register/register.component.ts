import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({ 
      next:(response) => {
        console.log(response);
      },
      error:(error) => {
        console.error(error);
        if (error.error && error.error.msg) {
          this.errorMsg = error.error.msg; 
        } else {
          this.errorMsg = 'Server Error';
        }
      }
  });
  }
}
