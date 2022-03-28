import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
      emailId: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      contactNo: new FormControl('', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required,
      ]),
    });
  }

  signUp(): void {
    if (this.signupForm.valid) {
      this.apiService.userSignup(this.signupForm.value).subscribe(
        (res) => {
          this.router.navigate(['login']);
          this.openSnackBar();
        },
        (err) => alert('Invalid details')
      );
    }
  }

  openSnackBar(): void {
    this._snackBar.open('Account Created Successfully!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }
}
