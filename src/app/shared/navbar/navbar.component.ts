/*import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model'; 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/login']);  // Redirection vers la page de login
      },
      error: (err) => {
        console.error('Erreur de déconnexion :', err);
      }
    });
  }

}*/
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';  // Importer le modèle User

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // On tente d'abord avec Google, sinon on essaie avec session
    this.userService.getUserInfo().subscribe({
      next: (user) => this.user = user,
      error: () => {
        this.userService.getUserProfile().subscribe({
          next: (user) => this.user = user,
          error: () => this.user = null
        });
      }
    });
  }

  logout(): void {
    this.userService.logout().subscribe();
  }
 
}

