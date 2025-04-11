import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../services/projet.service';
import { Projet } from '../models/Projet';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrls: ['./projet-details.component.css']
})
export class ProjetDetailsComponent implements OnInit {
  projet!: Projet;

  constructor(private route: ActivatedRoute, private projetService: ProjetService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projetService.getProjetById(id).subscribe(data => {
      this.projet = data;
    });
  }

  exportToPdf(): void {
    const doc = new jsPDF();

    doc.text(`Détails du Projet: ${this.projet.nom}`, 10, 10);
    doc.text(`Description: ${this.projet.description}`, 10, 20);
    doc.text(`Status: ${this.projet.status}`, 10, 30);
    doc.text(`Date de début: ${this.projet.dateDebut}`, 10, 40);
    doc.text(`Date de fin prévue: ${this.projet.dateFinPrevue}`, 10, 50);

    doc.save(`${this.projet.nom}-details.pdf`);
  }
}
