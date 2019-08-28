import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service'
import { User } from '../shared/models/user.model';


@Component({
    selector: 'sign-in',
template: `
    <br>
    <br>
    <br>
    <br>
        <ng-container *ngIf="authIsLoaded">
        <br>
        <br>
        <br>
        <br>
             <button *ngIf="!isLoggedIn" (click)="signIn()">Sign In With Google</button>
             <a  *ngIf="isLoggedIn" routerLink="/about" routerLinkActive="active">Company Information</a>

            <button *ngIf="isLoggedIn" (click)="signOut()">Sign Out</button>
        </ng-container>
        <h2 *ngIf="authIsLoaded && isLoggedIn"> Signed in as {{user.username}} </h2>`
})
export class GoogleAuthenticatorComponent implements OnInit {

    public authIsLoaded: boolean = false;
    public isLoggedIn: boolean = false;
    public user: User;


    constructor(private authenticatorService: AuthenticatorService) { }

    signIn(): void {
        this.authenticatorService.signIn();

    };

    signOut(): void {
        this.authenticatorService.signOut();
    }

    ngOnInit() {
        this.authenticatorService.isLoaded$.subscribe(value => {
            this.authIsLoaded = value;
            console.log(value)
        });

        this.authenticatorService.isLoggedIn$.subscribe(value => {
            this.isLoggedIn = value;
        });

        this.authenticatorService.user$.subscribe(value => {
            this.user = value;
        });

        this.authenticatorService.loadAuth2();
    }

};