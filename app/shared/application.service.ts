
import {Injectable, Inject} from "@angular/core";
import {SettingsService} from "./settings.service";
import {Settings} from "./settings";
import {AuthService} from "./auth.service";


@Injectable()
export class ApplicationService {

    constructor(@Inject(AuthService) private authService: AuthService, @Inject(SettingsService) private settingsService: SettingsService) {

    }

    public login() {

        let settings = this.settingsService.get();

        if (!this.authService.loggedIn && settings.name != "" && settings.password != "") {
            this.authService.login(settings.username, settings.password).then(
                succes => { 
                    console.log("login succes");
                },
                error => {
                    console.log("login error for '" + settings.username + "' " + error);
                }
            );
        }
        else {
            if (this.authService.loggedIn) {
                console.log("already logged in");
            }
            else {
                console.log("credentials not entered");
            }
        }
    }
}
