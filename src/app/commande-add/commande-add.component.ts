import { Component } from '@angular/core';
import { Commande } from '../Modele/commande.model';
import { CommandeServiceService } from '../services/commande-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-add',
  templateUrl: './commande-add.component.html',
  styleUrls: ['./commande-add.component.css']
})
export class CommandeAddComponent  {
  commande: Commande = {
    "statut": "Preparation",
    "dateCommande": "2025-04-03T19:28:31",
    "total": 120.0,
    "remise": 10.0,
    "dateLivraisonEstimee": "2025-04-08",
    "notes": "Commande test 1",
    "id": null,
   
  };

  constructor(private commandeService: CommandeServiceService, private router: Router) {}

  submit(): void {

    this.commandeService.addCommande(this.commande).subscribe(() => {
      this.router.navigate(['/commandes']);
    });
  }}