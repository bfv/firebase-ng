
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Settings} from "../../shared/settings";
import {SettingsService} from "../../shared/settings.service";
import {Router} from "@angular/router";


@Component({
    selector: "settingspage",
    providers: [SettingsService],
    templateUrl: "pages/settings/settings.component.html",
    styleUrls: ["pages/settings/settings.css"]
})

export class SettingsPage implements OnInit {

    private settings: Settings;  //public?!

    constructor(private settingsService: SettingsService, private router: Router) {

    }

    ngOnInit() {
        this.settings = this.settingsService.get();
    }

    authEnabledChanged(event: Event) {
        // sample event handler
    }

    confirmSettings() {

        // todo: solve this with a promise
        this.settingsService.save(this.settings).then(
            (newSettings) => {
                this.settings = newSettings;
                this.router.navigate(["/"]);
            },
            (error) => {
                alert("Error saving settings: \n\n" + error);
            }
        );
    }
}