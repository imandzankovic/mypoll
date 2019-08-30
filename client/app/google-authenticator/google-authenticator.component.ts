import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../services/authenticator.service'
import { GoogleService } from '../services/google.service'
import { User } from '../shared/models/user.model';
import { __values } from 'tslib';
import { Observable, BehaviorSubject } from 'rxjs';
import { CatService } from '../services/cat.service';
import { when } from 'q';


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
       <div>
        <br>
        <br>
        <br>
        <br>
        <button (click)="daj()">Daj</button>
            <button  *ngIf="isLoggedIn == 'true'" (click)="execute()">Execute</button>
            <button *ngIf="isLoggedIn !='true'" (click)="click()">Sign In First</button>
           
        </div>
       `
})
export class GoogleAuthenticatorComponent implements OnInit {

    public isLoggedIn: string = 'false';
    public presentations;


    constructor(private googleService: GoogleService, private catService: CatService) { }

    click() {
        console.log(this.isLoggedIn)
        this.googleService.authenticateAndLoad()
        this.isLoggedIn = (localStorage.getItem('loggedin'))
        this.googleService.isLoggedIn.subscribe(value => {
            this.isLoggedIn = value;
            console.log(value)
        });
    }

    execute() {
        this.googleService.execute()
    }

    daj(): any {
        console.log('jesil')
        this.getPresentations();

    }
    getPresentations() {
        this.googleService.getPresentations().subscribe(
            data => this.presentations = data,
            error => console.log(error),

        );
    }
    addPresentation() {
        console.log('uslo')
        this.googleService.addPresentation().subscribe(
            res => {
                this.presentations.push(res);

                console.log('item added successfully.', 'success');
            },
            error => console.log(error)
        );
    }


    ngOnInit() {
        this.googleService.init();
        this.googleService.isLoggedIn.subscribe(value => {
            this.isLoggedIn = value;
            console.log(value)
        });
    }

};