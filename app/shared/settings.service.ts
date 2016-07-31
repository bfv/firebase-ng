import {Injectable} from "@angular/core";
import applicationSettings = require("application-settings");
import {Settings} from "./settings";

@Injectable()
export class SettingsService {

    private settings: Settings;


    constructor() {
        this.settings = new Settings();
        this.fetchSettings(); 
    }

    private fetchSettings() {
        
        if (applicationSettings.hasKey("authEnabled")) {
            this.settings.authEnabled = applicationSettings.getBoolean("authEnabled");
        }

        if (applicationSettings.hasKey("username")) {
            this.settings.username = applicationSettings.getString("username");
        }

        if (applicationSettings.hasKey("password")) {
            this.settings.password = applicationSettings.getString("password");
        }
    }

    get(): Settings {
        return this.settings;
    }

    save(newSettings: Settings) : Promise<Settings> {

        return new Promise(
            (resolve, reject) => {
                try {
                    applicationSettings.setBoolean("authEnabled", newSettings.authEnabled);
                    applicationSettings.setString("username", newSettings.username);
                    applicationSettings.setString("password", newSettings.password);
                    this.settings = newSettings;
                    resolve(this.settings);
                }
                catch(error) {
                    reject(error);
                }
            }
        )
        
    }
}