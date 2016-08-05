
import {Injectable} from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import {AuthResult, LoginFailedType} from "./authresult";

@Injectable()
export class AuthService {

    private isLoggedIn: boolean = false;
    public get loggedIn() {
        return this.isLoggedIn;
    }
    
    private firebaseUser: firebase.User;


    public login(username: string, password: string) : Promise<AuthResult> {

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
                        resolve(new AuthResult());
                    },
                    error => {
                        // FirebaseAuthInvalidUserException --> user bestaat niet
                        // FirebaseAuthInvalidCredentialsException --> fout password

                        console.log("firebase auth error: " + error);
                        if (error.toString().indexOf("FirebaseAuthInvalidUserException") > 0) {
                            resolve(new AuthResult(LoginFailedType.account));
                        }
                        else if (error.toString().indexOf("FirebaseAuthInvalidCredentialsException")) {
                            resolve(new AuthResult(LoginFailedType.password));
                        } 
                
                        reject(new AuthResult(LoginFailedType.unknown));
                    }
                );                    
            }
        );
    }
}

