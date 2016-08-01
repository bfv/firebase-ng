import {Injectable} from "@angular/core";
import applicationSettings = require("application-settings");
import {Settings} from "./settings";

@Injectable()
export class SettingsService {

    private settings: Settings;

    constructor() {      
        this.fetchSettings(); 
    }

    private fetchSettings() {
        
        if (applicationSettings.hasKey("settings")) {
            this.settings = JSON.parse(applicationSettings.getString("settings"));
        }
        else {
            this.settings = new Settings();
        }

    }  // fetchSettings

    get(): Settings {
        return this.settings;
    }  // get

    save(newSettings: Settings) : Promise<Settings> {

        return new Promise(
            (resolve, reject) => {
                try {
                    applicationSettings.setString("settings", JSON.stringify(newSettings));
                    this.settings = newSettings;
                    resolve(this.settings);
                }
                catch(error) {
                    reject(error);
                }
            }
        );     
    }  // save
}