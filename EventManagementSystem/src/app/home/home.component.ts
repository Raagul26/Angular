import { Component} from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn')
  userId:string | null = localStorage.getItem('userId')
  
  constructor(private apiService: ApiServiceService, private router: Router, private route:ActivatedRoute, private _snackBar: MatSnackBar) { }

  logout():void {
    localStorage.clear()
    location.reload()
  }

  home():void
  {
    this.router.navigate([''],{relativeTo:this.route})
  }

  profile():void
  {
    this.router.navigate(['/profile'],{relativeTo:this.route})
  }
}
