import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../services/google.service'
import { User } from '../shared/models/user.model';
import { __values } from 'tslib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public authIsLoaded: boolean = false;
  public isLoggedIn: boolean;



  constructor( private googleService: GoogleService) { }

  click(): void {
      
      if(this.isLoggedIn==false){
          console.log(this.isLoggedIn) 
          this.googleService.authenticateAndLoad();
          this.execute();
      }
      else{
          console.log('exe')
          this.execute();
      }
     
  }

  click1(): void {
     
    this.googleService.isLoggedIn.subscribe(isLoggedIn => console.log('Value is : ' + isLoggedIn));
  }

  execute(): void {
      this.googleService.execute();
  }

  ngOnInit() {
      this.googleService.init();
      this.googleService.isLoggedIn.subscribe(i=> this.isLoggedIn=i)
      console.log(this.isLoggedIn)
  }


}
