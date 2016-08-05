
import {Injectable, Inject} from "@angular/core";
import {SettingsService} from "./settings.service";
import {Settings} from "./settings";
import {AuthService} from "./auth.service";
import {AuthResult, LoginFailedType} from "./authresult";


@Injectable()
export class ApplicationService {

    constructor(@Inject(AuthService) private authService: AuthService, @Inject(SettingsService) private settingsService: SettingsService) {

    }

    public login(settings?: Settings): Promise<AuthResult> {

        if (!settings) {
            settings = this.settingsService.get();
        }
        console.log("login attempt: " + settings.username + "/" + settings.password);

        return new Promise(

            (resolve, reject) => {

                if (!this.authService.loggedIn && settings.username != "" && settings.password != "") {
                    this.authService.login(settings.username, settings.password).then(
                        succes => { 
                            console.log("login succes");
                            resolve(succes);
                        },
                        error => {                       
                            console.log("login error for '" + settings.username + "' " + JSON.stringify(error));
                            reject(error);
                        }
                    );
                }
                else {
                    if (this.authService.loggedIn) {
                        console.log("already logged in");
                        resolve(new AuthResult());
                    }
                    else {
                        resolve(new AuthResult(LoginFailedType.noCredentials));
                    }
                }
            }

        );
    }
}
