import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

interface Events {
  status: string;
  message: string;
  data: [
    {
      id: string;
      eventId: string;
      title: string;
      venue: string;
      date: string;
      description: string;
      createdBy: string;
      createdOn: string;
      lastUpdatedOn: string;
      status: string;
    }
  ];
}

interface User{
  status:string,
  message:string,
  data:[{
    id:string,
    userId:string,
    firstName:string,
    lastName:string,
    emailId:string,
    contactNo:string,
    createdOn:string
  }]
}

interface BookingCount{
  status:string,
  message:string,
  data:number
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styles: [],
})
export class DashboardHomeComponent implements OnInit {
  events!: Events;
  users!: User;
  bookings!: BookingCount;
  constructor(private apiService: ApiServiceService) {}

  async ngOnInit(): Promise<void> {
    this.events = await this.apiService.getAllEvents().toPromise().then();

    this.users = await this.apiService.getAllUsers().toPromise().then();

    this.bookings = await this.apiService.getTotalBookings().toPromise().then();
  }
}
