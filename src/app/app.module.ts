import { FormsModule } from '@angular/forms';  // Import FormsModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';  // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input';  // Import MatInputModule
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EquipeDialogComponent } from './equipe-dialog/equipe-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';  // Import MatToolbarModule
import { MatMenuModule } from '@angular/material/menu';
import { GestionDialogComponent } from './gestion-dialog/gestion-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { BackendService } from './backend.service';
import { EquipeListComponent } from './equipe-list/equipe-list.component';

@NgModule({
  providers: [BackendService],
  declarations: [
    AppComponent,
    GestionDialogComponent,
    ChatDialogComponent,
    EquipeListComponent,
    //EquipeDialogComponent
  ],
  imports: [
    BrowserModule,
    
    BrowserAnimationsModule,
    FormsModule,  // Make sure FormsModule is imported here
    MatSidenavModule,
    HttpClientModule,  // Import HttpClientModule
    MatListModule,
    ToastrModule.forRoot( {positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
     // Import ToastrModule
    MatToolbarModule,  // Import MatToolbarModule
    MatIconModule,  // Import MatIconModule
    MatButtonModule,
    BrowserAnimationsModule,  // make sure this is here
    MatMenuModule,  // Import MatMenuModule
    AppRoutingModule,  // Import AppRoutingModule for routing
    MatFormFieldModule,  // Import MatFormFieldModule
    MatInputModule,  // Import MatInputModule
    MatDialogModule,  // Import MatDialogModule for dialog components
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
