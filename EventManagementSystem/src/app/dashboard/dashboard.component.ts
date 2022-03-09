import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {

  constructor(private apiService:ApiServiceService,private route: ActivatedRoute, private router: Router) { }

  home():void
  {
    this.router.navigate(['home'],{relativeTo:this.route})
  }

  users():void
  {
    this.router.navigate(['users'],{relativeTo:this.route})
  }

  events():void
  {
    this.router.navigate(['events'],{relativeTo:this.route})
  }

  bookings():void
  {
    this.router.navigate(['bookings'],{relativeTo:this.route})
  }

  logout():void
  {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('jwttoken')
    this.router.navigate(['admin/login'])
  }
}
