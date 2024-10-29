import {APP_INITIALIZER, inject, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./navbar/header.component";
import {HomeComponent} from "./home/home.component";
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {RouterOutlet} from "@angular/router";
import {HttpHandlerFn, HttpHeaders, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";

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
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
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
