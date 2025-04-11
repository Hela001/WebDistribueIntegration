import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { Projet, Status } from '../models/Projet';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  projets: Projet[] = [];
  loading: boolean = false;
  error: string | null = null;
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  selectedStatus: Status | null = null;  // Modifiez le type pour accepter null
  statusList: (Status | null)[] = [null, Status.DOING, Status.DONE, Status.TODO, Status.SUSPENDED];
  
  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.loading = true;
    this.projetService.getAllProjets(this.page, this.size).subscribe(
      (data: Page<Projet>) => {
        this.projets = data.content;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
    
    );
  }
  

  deleteProjet(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(
        () => {
          // Met à jour la liste localement
          this.projets = this.projets.filter(projet => projet.idProjet !== id);
  
          // Optionnel : si la liste devient vide sur cette page, revenir à la page précédente
          if (this.projets.length === 0 && this.page > 0) {
            this.page--;
            this.loadProjets(); // recharge la page précédente
          }
        },
        (error) => {
          this.error = 'Erreur lors de la suppression du projet';
          console.error(error);
        }
      );
    }
  }
  
  

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadProjets();
    }
  }

  onStatusChange(status: Status | null): void {
    if (status === null) {
      // Si aucun statut n'est sélectionné, charger tous les projets
      this.loadProjets();
    } else {
      // Si un statut est sélectionné, filtrer les projets
      this.projetService.getProjetsByStatus(status, this.page, this.size).subscribe(
        (data: Page<Projet>) => {
          this.projets = data.content;
          this.totalPages = data.totalPages;
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des projets par statut';
          console.error(error);
        }
      );
    }
  }
}
