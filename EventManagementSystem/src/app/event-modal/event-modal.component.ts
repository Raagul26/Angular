import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/api-service.service';

interface Event {
  status: string;
  message: string;
  data: {
    id: string;
    eventId: string;
    title: string;
    venue: string;
    date: string;
    amount: string;
    description: string;
    createdBy: string;
    createdOn: string;
    lastUpdatedOn: string;
    status: string;
  }
}

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './event-modal.component.html',
  styles: [],
})
export class EventModalComponent implements OnInit {
  EventForm!: FormGroup;
  close: boolean = false;
  title: string = this.apiService.modalName;
  event!: Event;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar ) {}

  async ngOnInit(): Promise<void> {
    this.EventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      venue: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(100)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(25),
      ]),
    });

    if (this.title == 'update') {
      this.event = await this.apiService.getEvent().toPromise().then();
      console.log(this.event);
      this.EventForm = new FormGroup({
        title: new FormControl(this.event.data.title, [
          Validators.required,
          Validators.minLength(10),
        ]),
        venue: new FormControl(this.event.data.venue, [
          Validators.required,
          Validators.minLength(3),
        ]),
        date: new FormControl(this.event.data.date, [Validators.required]),
        amount: new FormControl(this.event.data.amount, [
          Validators.required,
          Validators.min(100),
        ]),
        description: new FormControl(this.event.data.description, [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(25),
        ]),
      });
    }
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }

  createEvent(): void {
    if (this.EventForm.valid && this.title == 'create') {
      this.apiService.createEvent(this.EventForm.value).subscribe(
        (res) => {
          this.openSnackBar('Event Created Successfully!');
        },
        (err) => console.log(err)
      );
      this.dialog.closeAll();
    } else if (this.EventForm.valid && this.title == 'update') {
      this.apiService.updateEvent(this.EventForm.value).subscribe(
        (res) => {
          this.openSnackBar('Event Updated Successfully!');
        },
        (err) => console.log(err)
      );
      this.dialog.closeAll();
    }
  }
}
