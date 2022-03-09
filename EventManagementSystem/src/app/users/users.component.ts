import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

export interface Users{
  status:string,
  message:string,
  data:[{
    id:string,
    userId:string,
    firstName:string,
    lastName:string,
    emailId:string,
    contactNo:string,
    createdOn:string,
    status:string
  }]
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users!:Users
  error:any
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(
      res => {this.users = res},
      err => this.error = err
    )
  }

}
