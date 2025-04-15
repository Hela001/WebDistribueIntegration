import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { ProjetDetailsComponent } from './projet-details/projet-details.component';
import { ProjetFormComponent } from './projet-form/projet-form.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
import { FactureDetailsComponent } from './facture-details/facture-details.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { HomeMaterielComponent } from './home-materiel/home-materiel.component';
import { GestionDialogComponent } from './gestion-dialog/gestion-dialog.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { EquipeListComponent } from './equipe-list/equipe-list.component';
import { HomeEquipeComponent } from './home-equipe/home-equipe.component';
import { CommandeAddComponent } from './commande-add/commande-add.component';
import { CommandeEditComponent } from './commande-edit/commande-edit.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { CommandedetailsComponent } from './commandedetails/commandedetails.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// Angular Material Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { EquipeDialogComponent } from './equipe-dialog/equipe-dialog.component';
// Toastr
import{ ToastrModule } from 'ngx-toastr';
// Services
import { BackendService } from './backend.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { HomeMainComponent } from 'WebDistribueIntegration/home-main/home-main.component';
import { KeycloakService } from 'keycloak-angular';
import { AuthInterceptor } from './auth.interceptor';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'Commandekeycloak',
        clientId: 'gateway', // le nom de ton client public dans Keycloak
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HomeMainComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    ProjetListComponent,
    ProjetDetailsComponent,
    ProjetFormComponent,
    HomeEquipeComponent,
    FactureListComponent,
    FactureAddComponent,
    FactureDetailsComponent,
    FactureEditComponent,
    HomeMaterielComponent,
    GestionDialogComponent,
    ChatDialogComponent,
    EquipeListComponent,
    HomeEquipeComponent,
    CommandeAddComponent,
    CommandeEditComponent,
    CommandeListComponent,
    EquipeDialogComponent,
    CommandedetailsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    AppRoutingModule,  // Make sure AppRoutingModule is imported here
    RouterModule,  
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Set the default position for all toasts
      timeOut: 3000, // Optional: auto-hide after 3 seconds
      progressBar: true, // Optional: show progress bar
      closeButton: true, // Optional: add close button
      preventDuplicates: true, // Prevent duplicate toasts
    }),
  ],
  providers: [
    KeycloakService,
    
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService],
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    
    
    
    
    ,BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
