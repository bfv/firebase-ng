
import {Injectable} from "@angular/core";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class AuthService {

    private isLoggedIn: boolean = false;
    public get loggedIn() {
        return this.isLoggedIn;
    }
    
    private firebaseUser: firebase.User;


    public login(username: string, password: string) : Promise<boolean> {

        let loginOptions: firebase.LoginOptions = {
            type: firebase.LoginType.PASSWORD,
            email: username, 
            password: password
        };

        return new Promise(
            (resolve, reject) => {

                firebase.login(loginOptions).then(
                    result => {
                        console.log("firebase auth success: " + JSON.stringify(result));
                        this.firebaseUser = result;
                        resolve(true);
                    },
                    error => {
                        console.log("firebase auth error: " + error);
                        reject(false);
                    }
                );                    
            }
        );
    }
}