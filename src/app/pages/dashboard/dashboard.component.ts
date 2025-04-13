import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Utilisateurs chargés', this.users);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }
  deleteUser(userId: number | undefined): void {
    if (!userId) {
      console.error('ID utilisateur non défini');
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        // Remplace 'idU' si ton modèle utilise un autre nom
        this.users = this.users.filter(user => user.idU !== userId);
        console.log(`Utilisateur avec ID ${userId} supprimé`);
      },
      error: (err) => {
        console.error(`Erreur lors de la suppression de l'utilisateur ${userId}`, err);
      }
    });
  }
}
