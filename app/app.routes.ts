import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {StartPage} from "./pages/start/start.component";

export const routes: RouterConfig = [
  { path: "", component: StartPage },
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];