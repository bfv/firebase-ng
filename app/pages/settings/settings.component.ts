
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Settings} from "../../shared/settings";
import {SettingsService} from "../../shared/settings.service";
import {Router} from "@angular/router";
import {ApplicationService} from "../../shared/application.service";
import {AuthResult} from "../../shared/authresult";


@Component({
    selector: "settingspage",
    providers: [SettingsService],
    templateUrl: "pages/settings/settings.component.html",
    styleUrls: ["pages/settings/settings.css"]
})

export class SettingsPage implements OnInit {

    private settings: Settings;  //public?!

    constructor(private settingsService: SettingsService, private router: Router, private applicationService: ApplicationService) {

    }

    ngOnInit() {
        this.settings = this.settingsService.get();
    }

    authEnabledChanged(event: Event) {
        // sample event handler
    }

    confirmSettings() {

        // then check if credentials are valid
        this.applicationService.login(this.settings).then(
            success => { 
                if (success.ok) {

                    // todo: solve this with a promise
                    this.settingsService.save(this.settings).then(
                        (newSettings) => {
                            this.settings = newSettings;
                        },
                        (error) => {
                            alert("Error saving settings: \n\n" + error);
                        }
                    );
                    this.router.navigate(["/"]);
                }
                else {
                    alert("credentials are not OK");
                }
            },
            error => {
                console.log("error");        
            }
        );


    }
}