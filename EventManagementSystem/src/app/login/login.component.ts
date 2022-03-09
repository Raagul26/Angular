import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hide: boolean = true;

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailId: new FormControl('admin@admin.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  signIn():void {
    if (this.loginForm.valid) {
      if (this.router.url == '/admin/login') {
        this.apiService.adminLogin(this.loginForm.value).subscribe(
          (res) => {
            localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
            localStorage.setItem('isAdminLoggedIn', 'true');
            this.router.navigate(['/dashboard']);
          },
          (err) => console.log(err)
        );
      } else {
        this.apiService.userLogin(this.loginForm.value).subscribe(
          (res) => {
            localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
            this.apiService.setUserId(res.body.data);
            localStorage.setItem('isUserLoggedIn', 'true');
            this.router.navigate(['']);
          },
          (err) => console.log(err)
        );
      }
    }
  }
}
