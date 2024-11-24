import {Injectable} from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _userProfile: UserProfile | undefined;

  constructor() {
  }

  private _keycloak: Keycloak | undefined;

  get keycloak() {

    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080/',
        realm: 'food-journal',
        clientId: 'food-journal'
      })
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._userProfile;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._userProfile = (await this._keycloak?.loadUserProfile()) as UserProfile
      this._userProfile.token = this._keycloak?.token
    }
    {

    }
  }

  login() {
    return this.keycloak?.login()
  }

  logout() {
    return this.keycloak.logout()
  }

}
