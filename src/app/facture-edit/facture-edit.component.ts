import { Component , OnInit} from '@angular/core';
import { Facture, ModePayement, StatutFacture } from '../models/facture';
import { FactureService } from '../services/facture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facture-edit',
  templateUrl: './facture-edit.component.html',
  styleUrls: ['./facture-edit.component.css']
})
export class FactureEditComponent implements OnInit {
  facture: Facture = {
    id_facture: 0,
    numero_facture: '',
    date_facture: new Date(),
    montant_total: 0,
    statut: StatutFacture.PAYEE,
    mode_payement: ModePayement.CARTE_BANCAIRE
  };

  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFacture(this.route.snapshot.params['id']);
  }

  getFacture(id: number): void {
    this.factureService.get(id).subscribe({
      next: (data) => {
        this.facture = data;
      },
      error: (e) => console.error(e)
    });
  }

  updateFacture(): void {
    this.factureService.update(this.facture.id_facture!, this.facture).subscribe({
      next: (res) => {
        this.router.navigate(['/factures']);
      },
      error: (e) => console.error(e)
    });
  }
}