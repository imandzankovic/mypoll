import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service'
import { GoogleService } from '../services/google.service'
import { User } from '../shared/models/user.model';
import { __values } from 'tslib';
import { Observable } from 'rxjs';


@Component({
    selector: 'sign-in',
    // template: `
    //     <br>
    //     <br>
    //     <br>
    //     <br>
    //         <ng-container *ngIf="authIsLoaded">
    //         <br>
    //         <br>
    //         <br>
    //         <br>
    //              <button *ngIf="!isLoggedIn" (click)="signIn()">Sign In With Google</button>
    //              <a  *ngIf="isLoggedIn" routerLink="/about" routerLinkActive="active">Company Information</a>

    //             <button *ngIf="isLoggedIn" (click)="signOut()">Sign Out</button>
    //         </ng-container>
    //         <h2 *ngIf="authIsLoaded && isLoggedIn"> Signed in as {{user.username}} </h2>`
    template: `
    <br>
    <br>
    <br>
    <br>
       <div>
        <br>
        <br>
        <br>
        <br>
             
            <button (click)="click1()">Sign In console</button>
            <button (click)="click()">Sign In First</button>
           
        </div>
       `
})
export class GoogleAuthenticatorComponent implements OnInit {

    public authIsLoaded: boolean = false;
    public isLoggedIn: string;
    public user: User;


    constructor(private authenticatorService: AuthenticatorService, private googleService: GoogleService) { }

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

    ngOnInit() {
        this.googleService.init();
        this.isLoggedIn=localStorage.getItem('loggedin')
        console.log(this.isLoggedIn)
        // this.isLoggedIn=this.googleService.loggedin
        // console.log(this.isLoggedIn)
    }

};