import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service'
import { GoogleService } from '../services/google.service'
import { User } from '../shared/models/user.model';


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
             

            <button (click)="click()">Klikaj</button>
            <button (click)="execute()">Denk</button>
        </div>
       `
})
export class GoogleAuthenticatorComponent implements OnInit {

    public authIsLoaded: boolean = false;
    public isLoggedIn: boolean = false;
    public user: User;


    constructor(private authenticatorService: AuthenticatorService, private googleService: GoogleService) { }

    signIn(): void {
        this.authenticatorService.signIn();

    };

    signOut(): void {
        this.authenticatorService.signOut();
    }
    click(): void {
        this.googleService.authenticateAndLoad();
    }

    execute(): void {
        this.googleService.execute();
    }

    ngOnInit() {
        this.googleService.init();
    }

};