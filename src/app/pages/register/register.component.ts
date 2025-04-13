/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User, Role } from 'src/app/Models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    nomU: '',
    prenomU: '',
    emailU: '',
    motdepasseU: '',
    numtel: '',
    salaireU: 3000,
    role: Role.USER, // rôle par défaut
  };

  constructor(private userService: UserService, private router: Router) { }

  defaultRole: Role = Role.USER;  // Rôle par défaut 'USER'
  defaultSalaire: number = 3000;

  // La méthode pour envoyer le formulaire
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      console.log('Le formulaire est invalide');
      return; // Si le formulaire est invalide, on ne fait rien
    }

    // Log les valeurs du formulaire avant de les envoyer
    console.log('Données du formulaire :', form.value);

    const user: User = {
      ...form.value,
      role: this.defaultRole,
      salaireU: this.defaultSalaire
    };

    // Log l'objet `user` qui sera envoyé au serveur
    console.log('Objet utilisateur à enregistrer :', user);

    this.userService.register(user).subscribe(
      (response) => {
        console.log('Utilisateur inscrit avec succès', response);
        alert('Inscription réussie !'); // Alerte de succès
        this.router.navigate(['/login']); // Redirige vers la page de connexion
      },
      (error) => {
        console.error('Erreur lors de l\'inscription', error);
        alert('Une erreur est survenue lors de l\'inscription.'); // Alerte d'erreur
      }
    );
  }
}*/import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User, Role } from 'src/app/Models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    nomU: '',
    prenomU: '',
    emailU: '',
    motdepasseU: '',
    numtel: '',
    salaireU: 3000,
    role: Role.USER
  };

  defaultRole: Role = Role.USER;
  defaultSalaire: number = 3000;

  siteKey: string = '6Le52MMpAAAAADqeKWivBt7WBVNhdbxfuTacYRrH'; // clé publique Google
  captchaResponse: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  resolvedCaptcha(response: string): void {
    console.log('reCAPTCHA résolu :', response);
    this.captchaResponse = response;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.captchaResponse) {
      alert('Veuillez remplir tous les champs requis et valider le reCAPTCHA.');
      return;
    }

    const userPayload = {
      ...form.value,
      role: this.defaultRole,
      salaireU: this.defaultSalaire,
      captchaResponse: this.captchaResponse
    };

    console.log('Payload envoyé au backend :', userPayload);

    this.userService.registerWithCaptcha(userPayload).subscribe(
      (response) => {
        console.log('Utilisateur inscrit avec succès', response);
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        alert('Erreur lors de l\'inscription ou reCAPTCHA invalide.');
      }
    );
  }
}

