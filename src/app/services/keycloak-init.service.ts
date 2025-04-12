// keycloak-init.service.ts
import Keycloak from 'keycloak-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  private keycloak!: Keycloak;
  private initialized = false;

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'Commandekeycloak',
        clientId: 'gateway',
      });

      this.keycloak
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        })
        .then((authenticated) => {
          if (authenticated) {
            this.initialized = true;
            resolve();
          } else {
            this.keycloak.login();
          }
        })
        .catch(reject);
    });
  }

  getToken(): string | undefined {
    return this.initialized ? this.keycloak.token : undefined;
  }

  logout(): void {
    this.keycloak.logout();
  }

  getKeycloakInstance(): Keycloak {
    return this.keycloak;
  }
}
