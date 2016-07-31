
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Settings} from "../../shared/settings";
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {SettingsService} from "../../shared/settings.service";

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

    constructor(private page: Page, private settingsService: SettingsService) {

    }

    ngOnInit() {
        this.settings = this.settingsService.get();
    }

    authEnabledChanged(event: Event) {
        console.log("1.0.12 authEnabled changed to: " + this.settings.authEnabled);
    }

    confirmSettings() {

        // todo: solve this with a promise
        this.settingsService.save(this.settings);
    }
}