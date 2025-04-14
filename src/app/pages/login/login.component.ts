import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User,Role } from 'src/app/Models/user.model'; // Import de ton modèle User

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailU: string = '';
  motdepasseU: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    const user: User = {
      emailU: this.emailU,          // Remplir emailU
      motdepasseU: this.motdepasseU, // Remplir motdepasseU
      nomU: '',                     // On laisse vide pour le login
      prenomU: '',                  // On laisse vide pour le login
      numtel: '',                   // On laisse vide pour le login
      salaireU: 0,
                // On laisse une valeur par défaut pour le login
                   // Role par défaut, ou autre logique si nécessaire
    };

    this.userService.login(user).subscribe({
      next: (res) => {
        console.log('Connexion réussie :', res);
        console.log(res.role)
        alert('Connexion réussie !');
         // Vérifier le rôle de l'utilisateur dans la réponse
         if (res.role === 'ROLE_ADMIN') {
          // Rediriger vers le dashboard si l'utilisateur est un admin
          this.router.navigate(['/dashboard']);
        } else {
          // Rediriger vers la page d'accueil ou une autre page selon le rôle
          this.router.navigate(['/home']);
        }
      },
        
      
      error: (err) => {
        console.error('Erreur de connexion :', err);
        alert('Email ou mot de passe incorrect.');
      }
    });
    
  }
}
