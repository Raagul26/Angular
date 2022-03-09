import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableEventsComponent } from './available-events/available-events.component';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: AvailableEventsComponent },
      {
        path: 'profile',
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'users', component: UsersComponent },
      {
        path: 'events',
        component: EventsComponent,
      },
      { path: 'bookings', component: BookingsComponent },
    ],
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
