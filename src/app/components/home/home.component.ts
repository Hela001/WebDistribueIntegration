import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { Projet } from 'src/app/models/Projet';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projets: Projet[] = [];
  loading: boolean = false;
  error: string | null = null;
  page: number = 0;
  size: number = 5; // Taille de la page par défaut

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.loading = true;
    this.projetService.getAllProjets(this.page, this.size).subscribe(
      (data: Page<Projet>) => {
        this.projets = data.content; // Assurer que 'content' est utilisé
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des projets';
        this.loading = false;
        console.error(error);
      }
    );
  }
}
