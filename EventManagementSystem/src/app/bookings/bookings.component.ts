import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService, Titles } from '../services/api-service.service';
import { Users } from '../users/users.component';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styles: [],
})
export class BookingsComponent implements OnInit {
  eventForm!: FormGroup;

  users: Users | undefined;
  error: any;
  titles!: Titles;
  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getEventTitles().subscribe((res) => {
      this.titles = res;
    });

    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.apiService
        .getUsersByEventTitle(this.eventForm.value.eventTitle)
        .subscribe(
          (res) => {
            this.users = res;
            this.error = '';
          },
          (err) => {
            this.error = err.message;
            this.users = undefined;
          }
        );
    }
  }
}
