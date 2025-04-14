import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommandeAddComponent } from './commande-add/commande-add.component';
import { CommandeEditComponent } from './commande-edit/commande-edit.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { CommandedetailsComponent } from './commandedetails/commandedetails.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';






@NgModule({
  declarations: [
    AppComponent,
    CommandeAddComponent,
    CommandeEditComponent,
    CommandeListComponent,
    CommandedetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
  
  ],
  providers: [
 
   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
