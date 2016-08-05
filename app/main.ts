// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

// setup dependencies for ApplicationService
import {AuthService} from "./shared/auth.service";
import {SettingsService} from "./shared/settings.service";


let providers = [
    APP_ROUTER_PROVIDERS,
    AuthService,
    SettingsService
];

nativeScriptBootstrap(AppComponent, providers);