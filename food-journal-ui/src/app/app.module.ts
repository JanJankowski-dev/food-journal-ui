import {APP_INITIALIZER, inject, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./navbar/header.component";
import {HomeComponent} from "./home/home.component";
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {RouterOutlet} from "@angular/router";
import {HttpHandlerFn, HttpHeaders, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {DailyPlanComponent} from "./daily-plan/daily-plan.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MealCreateComponent} from "./daily-plan/meal/meal-create.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DailyPlanComponent,
    MealCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatDialogModule,
    MatButton
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(KeycloakService).keycloak.token;
  console.log('authInterceptor Call')
  if (authToken) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    });
    return next(authReq);
  }
  return next(req);
}
