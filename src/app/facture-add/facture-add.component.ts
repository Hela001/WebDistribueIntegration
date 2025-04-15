
import { Component , OnInit } from '@angular/core';
import { Facture, ModePayement, StatutFacture } from '../models/facture';
import { FactureService } from '../services/facture.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-facture-add',
  templateUrl: './facture-add.component.html',
  styleUrls: ['./facture-add.component.css']
})
export class FactureAddComponent implements OnInit {
  facture: Facture = {
    id_facture: 0,
    numero_facture: '',
    date_facture: new Date(),
    montant_total: 0,
    statut: StatutFacture.PAYEE,
    mode_payement: ModePayement.CARTE_BANCAIRE
  };
 // Ajoutez ces propriétés pour les options des selects
 statuts = Object.values(StatutFacture);
 modesPaiement = Object.values(ModePayement);

  constructor(
    private factureService: FactureService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveFacture(): void {
    const data = {
      id_facture: this.facture.id_facture, // Include the id_facture property
      numero_facture: this.facture.numero_facture,
      date_facture: this.facture.date_facture, // Assurez-vous que c'est au bon format
      montant_total: this.facture.montant_total,
      statut: this.facture.statut,
      mode_payement: this.facture.mode_payement
    };
  
    this.factureService.create(data).subscribe({
      next: (res) => {
        console.log('Facture créée:', res);
        this.router.navigate(['/factures']);
      },
      error: (e) => {
        console.error('Erreur lors de la création:', e);
        alert('Erreur lors de la création de la facture');
      }
    });
  }
}
