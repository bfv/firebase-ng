import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {StartPage} from "./pages/start/start.component";
import {SettingsPage} from "./pages/settings/settings.component";


export const routes: RouterConfig = [
  { path: "", component: StartPage },
  { path: "settings", component: SettingsPage },
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];