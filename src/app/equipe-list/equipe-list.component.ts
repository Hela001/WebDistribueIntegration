import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../equipe.service';
import { Equipe } from '../models/equipe';
import { MatDialog } from '@angular/material/dialog';
import { EquipeDialogComponent } from '../equipe-dialog/equipe-dialog.component';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent implements OnInit {
  isLoading: boolean | undefined;



showEquipeDetails(equipe: Equipe): void {
  this.equipeService.getEquipeById(equipe.idEquipe).subscribe({
    next: (data) => {
      this.selectedEquipe = data;
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de l\'équipe:', err);
    }
  });}
  equipes: Equipe[] = [];
  errorMessage: string = '';
selectedEquipe: Equipe | null = null;

  constructor(private equipeService: EquipeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEquipes();
  }

// When clicking Edit (without dialog)
selectEquipe(equipe: Equipe): void {
  this.selectedEquipe = equipe;
}
loadEquipes(): void {
  this.isLoading = true;
  this.equipeService.getAllEquipes().subscribe({
    next: (data) => {
      this.equipes = data;
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'Erreur lors de la récupération des équipes.';
      this.isLoading = false;
      console.error(error);
    }
  });
}

editEquipe(equipe: Equipe): void {
  const dialogRef = this.dialog.open(EquipeDialogComponent, {
    data: equipe, // pass the entire equipe object for editing
    width: '500px', // optional: for better layout
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadEquipes(); // refresh list if edited
    }
  });
  }

  // Open dialog for creating a new equipe
  createEquipe(): void {
    const dialogRef = this.dialog.open(EquipeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEquipes();
      }
    });
  }

  // Delete equipe
  deleteEquipe(id: number): void {
    if (confirm('Are you sure you want to delete this equipe?')) {
      this.equipeService.deleteEquipe(id).subscribe({
        next: () => {
          this.loadEquipes(); // Refresh the list after deletion
        },
        error: (err) => console.error('Error deleting equipe:', err)
      });
    }
  }
}
