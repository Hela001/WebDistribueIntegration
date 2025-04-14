import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
import { ChatComponent } from './chat/chat.component';  // Ensure you have the ChatComponent
import { EquipeDialogComponent } from './equipe-dialog/equipe-dialog.component';
import { HomeEquipeComponent } from './home-equipe/home-equipe.component';

const routes: Routes = [
  { path: '', component: ProjetListComponent }, // Page d'accueil
  { path: 'about', component: AboutComponent }, 
  { path: 'materiel', component: HomeMaterielComponent }, // Page "À propos"
  { path: 'contact', component: ContactComponent }, // Page de contact
  { path: 'projets', component: ProjetListComponent },
  { path: 'projets/create', component: ProjetFormComponent },
  { path: 'projets/:id', component: ProjetDetailsComponent },
  { path: 'projets/edit/:id', component: ProjetFormComponent },
  { path: 'factures', component: FactureListComponent },
  { path: 'factures/add', component: FactureAddComponent },
  { path: 'factures/:id', component: FactureDetailsComponent },
  { path: 'factures/edit/:id', component: FactureEditComponent },
  { path: 'materiel', component: HomeMaterielComponent },
  //{ path: '', redirectTo: '/projets', pathMatch: 'full' },
  // { path: '', redirectTo: '/factures', pathMatch: 'full' },
  { path: '', component: ProjetListComponent }, // Page d'accueil
  { path: '**', component: NotFoundComponent },
  { path: 'equipe', component: EquipeDialogComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'home-equipe', component: HomeEquipeComponent },

  { path: '', redirectTo: '/equipe', pathMatch: 'full' },
  { path: '', redirectTo: '/projets', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // Pour toute autre route inconnue


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
