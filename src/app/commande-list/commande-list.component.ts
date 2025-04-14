import { Component, OnInit } from '@angular/core';
import { Commande } from '../Modele/commande.model';
import { CommandeServiceService } from '../services/commande-service.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  commandesFiltrees: Commande[] = [];
  selectedStatut: string = '';  // Valeur pour le filtrage dynamique
  selectedDate: string = '';    // Valeur pour le filtrage par date
  currentPage: number = 1;      // Page actuelle pour la pagination
  pageSize: number = 5;        // Nombre de commandes par page
  commandesPaginees: Commande[] = [];  // Commandes à afficher sur la page actuelle

  constructor(private commandeService: CommandeServiceService) {}

  ngOnInit(): void {
    this.commandeService.getAllCommandes().subscribe(
      (response) => {
        console.log('Réponse des commandes:', response);
        if (response) {
          this.commandes = response;
          this.commandesFiltrees = response; // Initialisation avec toutes les commandes
          this.updatePagination();
        } else {
          this.commandes = [];
          this.commandesFiltrees = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }

  // Fonction de pagination
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.commandesPaginees = this.commandesFiltrees.slice(startIndex, endIndex);
  }

  // Fonction pour changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Calcul du nombre total de pages
  totalPages(): number {
    return Math.ceil(this.commandesFiltrees.length / this.pageSize);
  }

  // Met à jour les commandes filtrées et réinitialise la page actuelle
  refreshFilteredCommandes(commandes: Commande[]): void {
    this.commandesFiltrees = commandes;
    this.currentPage = 1;
    this.updatePagination();
  }

  // Filtrage dynamique par statut
  filterByStatut(): void {
    if (this.selectedStatut === '') {
      this.commandeService.getAllCommandes().subscribe(
        (data) => {
          this.refreshFilteredCommandes(data);
        },
        (error) => {
          console.error('Erreur lors du filtrage des commandes:', error);
        }
      );
    } else {
      this.commandeService.getCommandesByStatut(this.selectedStatut).subscribe(
        (data) => {
          this.refreshFilteredCommandes(data);
        },
        (error) => {
          console.error('Erreur lors du filtrage des commandes:', error);
        }
      );
    }
  }

  // Filtrage dynamique par date
  filterByDate(): void {
    if (!this.selectedDate) {
      this.refreshFilteredCommandes(this.commandes);
      return;
    }

    const formattedDate = this.selectedDate + ":00"; // Format attendu par le backend
    this.commandeService.getCommandesByDateCommande(formattedDate).subscribe(
      (data) => {
        this.refreshFilteredCommandes(data);
      },
      (error) => {
        console.error('Erreur lors du filtrage par date:', error);
      }
    );
  }

  // Fonction de suppression d'une commande
  deleteCommande(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
    if (!confirmation) return;

    this.commandeService.deleteCommande(id).subscribe(
      () => {
        this.commandes = this.commandes.filter((commande) => commande.id !== id);
        this.filterByStatut();
        console.log('Commande supprimée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la commande:', error);
      }
    );
  }

  // Change le statut et filtre en conséquence
  onStatutChange(): void {
    this.filterByStatut();
  }

  // Change la date et filtre en conséquence
  onDateChange(): void {
    this.filterByDate();
  }
}
