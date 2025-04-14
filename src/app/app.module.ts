import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { ProjetDetailsComponent } from './projet-details/projet-details.component';
import { ProjetFormComponent } from './projet-form/projet-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
import { FactureDetailsComponent } from './facture-details/facture-details.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { CommonModule } from '@angular/common';
import { HomeMaterielComponent } from './home-materiel/home-materiel.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

// Toastr

// Custom components
import { GestionDialogComponent } from './gestion-dialog/gestion-dialog.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { EquipeListComponent } from './equipe-list/equipe-list.component';


// Services
import { BackendService } from './backend.service';
import { ToastrModule } from 'ngx-toastr';
import { HomeEquipeComponent } from './home-equipe/home-equipe.component';
import { CommandeAddComponent } from './commande-add/commande-add.component';
import { CommandeEditComponent } from './commande-edit/commande-edit.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { CommandedetailsComponent } from './commandedetails/commandedetails.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    ProjetListComponent,
    ProjetDetailsComponent,
    ProjetFormComponent,
    FactureListComponent,
    FactureAddComponent,
    FactureDetailsComponent,
    FactureEditComponent,
    HomeMaterielComponent ,
    GestionDialogComponent,
    ChatDialogComponent,
    EquipeListComponent,
    HomeEquipeComponent,
    AppComponent,
    CommandeAddComponent,
    CommandeEditComponent,
    CommandeListComponent,
    CommandedetailsComponent,
    // EquipeDialogComponent (décommenter si besoin)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,    BrowserModule,

    AppRoutingModule, 
    FormsModule,
    HttpClientModule,


   
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }




