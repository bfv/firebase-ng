import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";


@Component({
    selector: "startpage",
    templateUrl: "pages/start/start.html",
    styleUrls: ["app.css"],
})

export class StartPage implements OnInit {

    constructor(private router: Router, private page: Page) {

    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    launchSettings() {
        this.router.navigate(["/settings"]);
    }

}
