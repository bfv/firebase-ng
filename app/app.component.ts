import {Component, OnInit} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import firebase = require("nativescript-plugin-firebase");
//import {SettingsService} from "./shared/settings.service";
import {ApplicationService} from "./shared/application.service";
import {Router} from "@angular/router";
import {LoginFailedType} from "./shared/authresult";

@Component({
    selector: "firebaseng",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [ApplicationService], 
    template: "<page-router-outlet></page-router-outlet>"
})

export class AppComponent implements OnInit {

    //private forceCompile: string = "0.0.3";

    constructor(private applicationService: ApplicationService, private router: Router) {

    }

    ngOnInit() {

        let firebaseOptions = {
            persist: false
        };

        firebase.init(firebaseOptions).then(
            instance => {
                console.log("firebase init: OK");

                // if the push token is returned everything works
                firebase.addOnPushTokenReceivedCallback(
                    token => { console.log("push token: " + token); }
                );

                console.log("attempt to login");

                this.applicationService.login().then(
                    success => {
                        if (!success.ok) {

                            switch (success.error) {

                                case LoginFailedType.noCredentials:
                                    alert("no login credentials");
                                    break;

                                case LoginFailedType.password:
                                    alert("credentials are not correct");
                                    break;

                            }
                            
                            this.router.navigate(["/settings"]);
                        }
                        // great!
                    },
                    error => {
                    }
                );

            },
            error => {
                console.log("firebase init error: " + JSON.stringify(error));
            }
        );

    }
}