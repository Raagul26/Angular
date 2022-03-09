import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './events/events.component'
import {MatCardModule} from '@angular/material/card';
import { EventModalComponent } from './event-modal/event-modal.component';
import { HomeComponent } from './home/home.component'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserEventsComponent } from './user-events/user-events.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AvailableEventsComponent } from './available-events/available-events.component'
import {MatMenuModule} from '@angular/material/menu'
import {MatSelectModule} from '@angular/material/select'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UsersComponent,
    EventsComponent,
    EventModalComponent,
    HomeComponent,
    BookingsComponent,
    DashboardHomeComponent,
    UserEventsComponent,
    UserDetailsComponent,
    AvailableEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
