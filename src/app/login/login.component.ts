import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { materialModules } from '../material/material.mosule';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, materialModules],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      if(localStorage.getItem('Authorization')?.length > 0){
        this.router.navigate(['/']);
      }
  }

  login() {
    const user = {
      email: this.email,
      password: this.password,
    };
    this.service.loginUser('/user-action/authenticate', user).subscribe({
      next: (data) => {
        localStorage.setItem('email', data.response.email);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
