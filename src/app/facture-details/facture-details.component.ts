import { Component , OnInit } from '@angular/core';
import { FactureService } from '../services/facture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../models/facture';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {
  facture!: Facture ;


  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.factureService.get(id).subscribe(data => {
      this.facture = data;
    });
  }

  getFacture(id: number): void {
    this.factureService.get(id).subscribe({
      next: (data) => {
        this.facture = data;
      },
      error: (e) => console.error(e)
    });
  }


  downloadPdf(): void {
      const doc = new jsPDF();
  
      doc.text(`Détails du facture: ${this.facture.numero_facture}`, 10, 10);
      doc.text(`Status: ${this.facture.date_facture}`, 10, 20);
      doc.text(`Date de début: ${this.facture.statut}`, 10, 30);
      doc.text(`Date de fin prévue: ${this.facture.montant_total}`, 10, 40);
      doc.text(`Montant total: ${this.facture.mode_payement}`, 10, 50);
      doc.save(`${this.facture.numero_facture}-details.pdf`);
    }
}

