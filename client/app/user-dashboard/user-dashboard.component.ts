import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../services/google.service'
//import { User } from '../shared/models/user.model';
import { __values } from 'tslib';
import { Observable } from 'rxjs';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public authIsLoaded: boolean = false;
  public isLoggedIn: string;
  user: User;
  isLoading = true;


  constructor( private googleService: GoogleService,
    private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

              click(): void {
        
                if(this.isLoggedIn!='true'){
                    console.log(this.isLoggedIn) 
                    this.googleService.authenticateAndLoad()
                    .then(() => {
                        //do stuff 
                        this.execute();
                      })
                   
                }
                else{
                    console.log('exe')
                    this.execute();
                }
               
            }


  execute(): void {
      this.googleService.execute();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.getUser();
    this.googleService.init();
    this.isLoggedIn=localStorage.getItem('loggedin')
    console.log(this.isLoggedIn)
  }


}
