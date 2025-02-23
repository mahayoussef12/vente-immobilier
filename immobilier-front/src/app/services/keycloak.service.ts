import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

import { UnaryFunction } from 'rxjs';
import {UserProfile} from "../Model/user-profile";
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: any | undefined;
  get keycloak() {
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'immobilier',
        clientId: 'immobilier_api'
      })
    }
    return this._keycloak;
  }
  get profile(): UserProfile  {
    return this._profile;
  }
  constructor() { }
  async init () {
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
    });
    if(authenticated){
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token;
    }
  }
  login(){
    return this.keycloak.login();
  }
  logout() {

    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }

  getUserRoles(): string[] {
    return this.keycloak.realmAccess?.roles || [];
  }
  getUserId(): string | undefined {
    const tokenParsed = this.keycloak.tokenParsed;
    return tokenParsed?.sub; // 'sub' is the user ID in Keycloak's token
  }
}
