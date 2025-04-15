import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  async init(): Promise<boolean> {
    return this.keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'Commandekeycloak',
        clientId: 'gateway'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer'
    });
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  logout(): Promise<void> {
    return this.keycloak.logout();
  }

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(this.keycloak.isLoggedIn());
  }
}
