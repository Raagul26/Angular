import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
      amount:string,
      description: string;
      createdBy: string;
      createdOn: string;
      lastUpdatedOn: string;
      status: string;
    }
  ];
}

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styles: [],
})
export class AvailableEventsComponent implements OnInit {
  events!: Events;
  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn');
  userId = localStorage.getItem('userId');
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getActiveEvents().subscribe((res) => {
      this.events = res;
    });
  }

  openSnackBar(msg: string):void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }

  bookEvent(event: Event):void {
    if (this.isLoggedIn == 'true') {
      var eventId = (<HTMLButtonElement>event.target).id;
      localStorage.setItem('eventId', eventId);
      console.log(event);
      this.apiService.bookEvent().subscribe(
        (res) => {
          this.openSnackBar('Event Booked Successfully!');
          console.log(res);
        },
        (err) => {
          this.openSnackBar(err.error.message);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
