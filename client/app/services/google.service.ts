import { Injectable, NgZone, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { resolve } from 'q';

@Injectable()
export class GoogleService {
    public PROJECT_ID = 'YOUR_PROJECT_ID';
    public CLIENT_ID = '353142091842-clls97ae475jfdflp0v4d7bn0g4agtsj.apps.googleusercontent.com';
    public API_KEY = 'AIzaSyDJRkktyw3DlRFR6wwF_i7Ilz15I9DdrHo';
    public API_VERSION = 'v1';
    public SCOPES = [
        'https://www.googleapis.com/auth/drive',

        // View the files in your Google Drive
        'https://www.googleapis.com/auth/drive.readonly',

        // View and manage your Google Slides presentations
        'https://www.googleapis.com/auth/presentations',

        // View your Google Slides presentations
        'https://www.googleapis.com/auth/presentations.readonly',

        // View and manage your spreadsheets in Google Drive
        'https://www.googleapis.com/auth/spreadsheets',

        // View your Google Spreadsheets
        'https://www.googleapis.com/auth/spreadsheets.readonly',
    ]

    constructor(private zone: NgZone, private http: HttpClient) { }

    authenticate(): any {
        return gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/presentations" })
            .then(function () { console.log("Sign-in successful"); },
                function (err) { console.error("Error signing in", err); });
    }
    loadClient(): any {
        gapi.client.setApiKey('AIzaSyDJRkktyw3DlRFR6wwF_i7Ilz15I9DdrHo');
        return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/slides/v1/rest", "v1")
            .then(function () { console.log("GAPI client loaded for API"); },
                function (err) { console.error("Error loading GAPI client for API", err); });
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    execute(): any {
        return gapi.client['slides'].presentations.create({
            "resource": {}
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log("https://docs.google.com/presentation/d/" + response.result.presentationId + "/edit?usp=drivesdk")
                window.open("https://docs.google.com/presentation/d/" + response.result.presentationId + "/edit?usp=drivesdk")
            },
                function (err) { console.error("Execute error", err); });

    }
    init(): any {
        gapi.load("client:auth2", function () {
            gapi.auth2.init({ client_id: "353142091842-clls97ae475jfdflp0v4d7bn0g4agtsj.apps.googleusercontent.com" });
        });
    }
    authenticateAndLoad(): any {
        this.authenticate().then(this.loadClient)
    }

}