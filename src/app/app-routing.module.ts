import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';  // Ensure you have the ChatComponent
import { EquipeDialogComponent } from './equipe-dialog/equipe-dialog.component';

const routes: Routes = [
  { path: 'equipe', component: EquipeDialogComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/equipe', pathMatch: 'full' },  // Redirect to Equipe by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
