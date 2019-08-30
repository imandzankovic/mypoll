import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { GoogleService } from '../services/google.service'
import { __values } from 'tslib';
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
  public isLoggedIn: string = 'false';
  public presentationId;
  user: User;
  isLoading = true;


  constructor(private googleService: GoogleService,
    private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) { }



  click() {
    console.log(this.isLoggedIn)
    this.googleService.authenticateAndLoad()
    this.isLoggedIn = (localStorage.getItem('loggedin'))
    this.googleService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(value)
    });
  }

  execute(): void {
    this.googleService.execute();
  }
getPresentations()
{
  this.googleService.getPresentations();
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
    this.googleService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log(value)
    });
  }


}
