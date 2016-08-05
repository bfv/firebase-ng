import {Component, OnInit} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "firebaseng",
  directives: [NS_ROUTER_DIRECTIVES],
  template: "<page-router-outlet></page-router-outlet>"
})

export class AppComponent implements OnInit { 

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
            
        },
        error => {
            console.log("firebase init error: " + error);
        }
    );

  }

}