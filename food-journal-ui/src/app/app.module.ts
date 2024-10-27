import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./navbar/header.component";
import {HomeComponent} from "./home/home.component";
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {RouterOutlet} from "@angular/router";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
