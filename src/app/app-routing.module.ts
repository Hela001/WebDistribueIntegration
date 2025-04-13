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

const routes: Routes = [
  { path: 'about', component: AboutComponent }, // Page "À propos"
  { path: 'contact', component: ContactComponent }, // Page de contact
  { path: 'projets', component: ProjetListComponent },
  { path: 'projets/create', component: ProjetFormComponent },
  { path: 'projets/:id', component: ProjetDetailsComponent },
  { path: 'projets/edit/:id', component: ProjetFormComponent },
  { path: 'factures', component: FactureListComponent },
  { path: 'factures/add', component: FactureAddComponent },
  { path: 'factures/:id', component: FactureDetailsComponent },
  { path: 'factures/edit/:id', component: FactureEditComponent },

  //{ path: '', redirectTo: '/projets', pathMatch: 'full' },
 // { path: '', redirectTo: '/factures', pathMatch: 'full' },
 { path: '', component: ProjetListComponent }, // Page d'accueil
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
