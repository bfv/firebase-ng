
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Settings} from "../../shared/settings";
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {SettingsService} from "../../shared/settings.service";
import {Router} from "@angular/router";


@Component({
    selector: "settingspage",
    providers: [SettingsService],
    templateUrl: "pages/settings/settings.component.html",
    styleUrls: ["pages/settings/settings.css"]
})

export class SettingsPage implements OnInit {

    @ViewChild("authContainer") authContainer: ElementRef;
    @ViewChild("otherContainer") otherContainer: ElementRef;

    public settings: Settings;

    private title: string = "Settings 1.1.7";

    constructor(private page: Page, private settingsService: SettingsService, private router: Router) {

    }

    ngOnInit() {
        this.settings = this.settingsService.get();
    }

    authEnabledChanged(event: Event) {
        console.log("1.0.12 authEnabled changed to: " + this.settings.authEnabled);
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