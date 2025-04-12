import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeServiceService } from '../services/commande-service.service';
import { Commande } from '../Modele/commande.model'; 

@Component({
  selector: 'app-commande-edit',
  templateUrl: './commande-edit.component.html',
  styleUrls: ['./commande-edit.component.css']
})
export class CommandeEditComponent implements OnInit {
  commande!: Commande;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeServiceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.commandeService.getCommandeById(id).subscribe(data => {
      this.commande = data; // Populate the commande object
    });
  }

  updateCommande(): void {
    if (this.commande.id !== null) {
      this.commandeService.updateCommande(this.commande.id, this.commande).subscribe(
        (response) => {
          console.log('Commande updated:', response);
          this.router.navigate(['/commandes']); // Redirect to the list of commandes after successful update
        },
        (error) => {
          console.error('Error updating commande:', error);
        }
      );
    } else {
      console.error('Commande ID is null, cannot update.');
    }
  }
  
}
