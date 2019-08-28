import { Injectable, NgZone, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';

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
    authorization(): any {
        gapi.load('client', () => {
            gapi.client.setApiKey(this.API_KEY);
            gapi.client.load('compute', this.API_VERSION);
            gapi.client.load('slides', 'v1');

            gapi.auth.authorize({
                client_id: this.CLIENT_ID,
                scope: this.SCOPES,
                immediate: false
            }, function (authResult) {
                console.log(authResult)
                if (authResult && !authResult.error) {
                    window.alert('Auth was successful!');
                    gapi.client.load('slides', 'v1', function () {
                        console.log(gapi.client)
                        console.log(gapi.client['slides'].presentations)
                        var file = gapi.client['slides'].presentations.get({ 'presentationId': '1yRce8YuFiTR0A4m9d4xd7s2-2FFEpoZNhrqFnTxYtRw' });
                        file.execute(function (resp) {
                            console.log("Response", resp.result.presentationId);
                            console.log("https://docs.google.com/presentation/d/" + resp.result.presentationId + "/edit?usp=drivesdk")
                        });

                    });
                } else {
                    window.alert('Auth was not successful');
                }
            }
            );
        })
    }

}