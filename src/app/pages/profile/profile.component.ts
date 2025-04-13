/*import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        console.log('Données utilisateur récupérées:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur de récupération du profil :', err);
      }
    });
  }
}*/
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;  // Déclare l'utilisateur à afficher
  isGoogleUser: boolean = false;  // Variable pour vérifier si l'utilisateur est connecté via Google

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Vérifier quel type d'utilisateur est connecté (Google ou login classique)
    this.checkIfGoogleUser();
  }

  // Vérifie si l'utilisateur est authentifié via Google
  checkIfGoogleUser(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        console.log('Utilisateur connecté via Google :', data);
        this.isGoogleUser = true;  // Si on obtient des données de Google, c'est un utilisateur Google
        this.user = data;  // Stocke les données utilisateur
      },
      error: () => {
        // Si on n'a pas d'utilisateur via Google, on suppose un login classique et on appelle la méthode appropriée
        this.getClassicUserProfile();
      }
    });
  }

  // Récupère le profil de l'utilisateur connecté via login classique
  getClassicUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Utilisateur connecté via login classique :', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur de récupération du profil classique :', err);
      }
    });
  }
}

