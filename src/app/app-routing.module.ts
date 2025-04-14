import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { CommandedetailsComponent } from './commandedetails/commandedetails.component';
import { CommandeAddComponent } from './commande-add/commande-add.component';
import { CommandeEditComponent } from './commande-edit/commande-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/commandes', pathMatch: 'full' },
  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/:id', component: CommandedetailsComponent },
  { path: 'commande/new', component: CommandeAddComponent },
  { path: 'commande/edit/:id', component: CommandeEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
