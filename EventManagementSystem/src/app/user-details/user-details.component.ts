import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';

interface User{
  status:string,
  message:string,
  data:{
    firstName:string,
    lastName:string,
    emailId:string,
    contactNo:string
  }
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [],
})
export class UserDetailsComponent implements OnInit {

  userDetails!:User

  userDetailsForm!: FormGroup;
  editShow: boolean = true;
  readonly: boolean = true;

  constructor(private apiService: ApiServiceService) {}

  async ngOnInit(): Promise<void> {
    
    this.userDetails = await this.apiService.getUser().toPromise().then();

    this.userDetailsForm = new FormGroup({
      firstName: new FormControl(this.userDetails.data.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      lastName: new FormControl(this.userDetails.data.lastName, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
      ]),
      contactNo: new FormControl(this.userDetails.data.contactNo, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    });
  }

  edit(): void {
    if (this.editShow) {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
    } else {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
    }
  }

  onSubmit(): void {
    if (this.userDetailsForm.valid) {
      this.readonly = !this.readonly;
      this.editShow = !this.editShow;
      this.apiService
        .updateUser(this.userDetailsForm.value)
        .subscribe((res) => console.log(res));
    }
  }
}
