import { NgModule } from '@angular/core';
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

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

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
import{ ToastrModule } from 'ngx-toastr';
// Services
import { BackendService } from './backend.service';
import { RecaptchaModule } from 'ng-recaptcha';

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
    HomeMaterielComponent,
    GestionDialogComponent,
    ChatDialogComponent,
    EquipeListComponent,
    HomeEquipeComponent,
    CommandeAddComponent,
    CommandeEditComponent,
    CommandeListComponent,
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
    BrowserAnimationsModule,
    RecaptchaModule,
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
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Other modules
import { RecaptchaModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    
    // Material modules
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    RecaptchaModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DatePipe
  ],
  // ... rest of your module
})
export class AppModule { }*/