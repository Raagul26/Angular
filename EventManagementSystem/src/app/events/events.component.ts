import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';

export interface Events {
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
  selector: 'app-events',
  templateUrl: './events.component.html',
  styles: [],
})
export class EventsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  events!: Events;
  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getActiveEvents().subscribe((res) => (this.events = res));
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }

  deleteEvent(event: Event): void {
    var eventId = (<HTMLButtonElement>event.target).id.replace('-del', '');
    this.apiService.deleteEvent(eventId).subscribe(
      (res) => {
        this.openSnackBar('Event Deleted Successfully!');
      },
      (err) => this.openSnackBar('Something went wrong')
    );
  }

  editEvent(event: Event): void {
    var eventId = (<HTMLButtonElement>event.target).id.replace('-edit', '');
    this.apiService.setEventId(eventId);
    this.apiService.setModalName('update');
    this.dialog.open(EventModalComponent);
  }

  create(): void {
    this.apiService.setModalName('create');
    this.dialog.open(EventModalComponent);
  }
}
