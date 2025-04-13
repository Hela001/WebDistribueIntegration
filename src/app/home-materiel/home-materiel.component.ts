import { Component, OnInit } from '@angular/core';
import { Materiel, MaterielServiceService } from '../materiel-service.service';

@Component({
  selector: 'app-home-materiel',
  templateUrl: './home-materiel.component.html',
  styleUrls: ['./home-materiel.component.css']
})
export class HomeMaterielComponent implements OnInit {
  materiels: Materiel[] = [];
  filteredMateriels: Materiel[] = []; // Liste filtrée en fonction de la recherche
  showAddForm: boolean = false;
  emailMessage: string | null = null; // Pour afficher le message de l'email
  searchTerm: string = ''; // Term de recherche

  selectedMateriel: Materiel | null = null;
  newMateriel: Materiel = {
    nomMateriel: '',
    quantite: 0,
    prixMateriel: 0
  };

  constructor(private materielService: MaterielServiceService) { }

  ngOnInit(): void {
    this.getAllMateriels();
  }

  getAllMateriels(): void {
    this.materielService.getAllMateriels().subscribe({
      next: (data) => {
        this.materiels = data;
        this.filteredMateriels = data; // Initialement, afficher tous les matériels
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des matériels :', err);
      }
    });
  }

  deleteMateriel(id?: number): void {
    if (id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      this.materielService.deleteMateriel(id).subscribe({
        next: () => {
          this.materiels = this.materiels.filter(m => m.idMateriel !== id);
          this.filteredMateriels = this.filteredMateriels.filter(m => m.idMateriel !== id); // Mettre à jour la liste filtrée
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du matériel :', err);
        }
      });
    }
  }

  searchMateriels(): void {
    console.log('Recherche en cours :', this.searchTerm); // Ajoute ceci pour vérifier la valeur du terme de recherche
    if (this.searchTerm.trim() === '') {
      this.filteredMateriels = this.materiels;
    } else {
      this.filteredMateriels = this.materiels.filter(mat =>
        mat.nomMateriel.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Tri des matériels par prix
  sortByPrice(order: 'asc' | 'desc'): void {
    this.materielService.getMaterielsSortedByPrice(order).subscribe({
      next: (data) => {
        this.materiels = data;
        this.filteredMateriels = data; // Mettre à jour la liste filtrée après tri
      },
      error: (err) => {
        console.error('Erreur lors du tri des matériels par prix :', err);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.resetNewMateriel();
    this.showAddForm = false;
  }

  resetNewMateriel(): void {
    this.newMateriel = {
      nomMateriel: '',
      quantite: 0,
      prixMateriel: 0
    };
  }

  submitAdd(): void {
    this.materielService.addMateriel(this.newMateriel).subscribe({
      next: (createdMat) => {
        this.materiels.push(createdMat); // ajoute à la liste sans rechargement
        this.filteredMateriels.push(createdMat); // Mettre à jour la liste filtrée
        this.resetNewMateriel();
        this.showAddForm = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du matériel :', err);
      }
    });
  }

  showUpdateForm(mat: Materiel): void {
    this.selectedMateriel = { ...mat };
  }

  submitUpdate(): void {
    if (this.selectedMateriel && this.selectedMateriel.idMateriel !== undefined) {
      this.materielService.updateMateriel(this.selectedMateriel.idMateriel, this.selectedMateriel).subscribe({
        next: (updatedMat) => {
          const index = this.materiels.findIndex(m => m.idMateriel === updatedMat.idMateriel);
          if (index !== -1) {
            this.materiels[index] = updatedMat;
            this.filteredMateriels[index] = updatedMat; // Mettre à jour la liste filtrée
          }
          this.selectedMateriel = null;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
        }
      });
    }
  }

  cancelUpdate(): void {
    this.selectedMateriel = null;
  }

  sendTestEmail(): void {
    this.materielService.sendTestEmail().subscribe({
      next: (response) => {
        this.emailMessage = 'L\'e-mail a été envoyé avec succès!';
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', err);
        this.emailMessage = 'Une erreur est survenue lors de l\'envoi de l\'e-mail.';
      }
    });
  }
}
