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
showEquipeDetails(_t9: Equipe) {
throw new Error('Method not implemented.');
}
  equipes: Equipe[] = [];
  errorMessage: string = '';

  constructor(private equipeService: EquipeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEquipes();
  }

  loadEquipes(): void {
    this.equipeService.getAllEquipes().subscribe({
      next: (data) => this.equipes = data,
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des équipes.';
        console.error(error);
      }
    });
  }

  // Open dialog for editing
  editEquipe(equipe: Equipe): void {
    const dialogRef = this.dialog.open(EquipeDialogComponent, {
      data: { id: equipe.idEquipe },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEquipes(); // refresh the list
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
  deleteEquipe(equipe: Equipe): void {
    if (confirm(`Voulez-vous vraiment supprimer l’équipe "${equipe.nomEquipe}" ?`)) {
      this.equipeService['deleteEquipe'](equipe.idEquipe).subscribe({
        next: () => this.loadEquipes(),
        error: (err: any) => console.error('Erreur suppression:', err)
      });
    }
  }
}
