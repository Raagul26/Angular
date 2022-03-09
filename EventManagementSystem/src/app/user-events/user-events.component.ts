import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Events } from '../events/events.component';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styles: [],
})
export class UserEventsComponent implements OnInit {
  bookedEvents!: Events;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.bookedEvents = await this.apiService.getBookings().toPromise().then();
  }

  cancelEvent(event: Event): void {
    var eventId = (<HTMLButtonElement>event.target).id;
    this.apiService.cancelEvent(eventId).subscribe(
      () => {
        this.openSnackBar('Event Cancelled Successfully');
        location.reload;
      },
      (err) => this.openSnackBar(err.message)
    );
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }
}
