import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // <-- this is the fix
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Equipe } from '../models/equipe';
@Component({
  selector: 'app-equipe-dialog',
  templateUrl: './equipe-dialog.component.html',
  styleUrls: ['./equipe-dialog.component.css'], 
  standalone: true,
  imports: [
    // Angular and Material Modules
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class EquipeDialogComponent {

  equipe: Equipe = {
    idEquipe: 0, // Initialize with a default valid value (0 or any valid ID)
    name: '', // Initialize name as empty string
    disponibilite: '',
    nomEquipe: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EquipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService 
  ) {}

  onSubmit() {
    if (this.equipe.id) {
      this.backendService.updateEquipe(this.equipe.id, this.equipe).subscribe({
        next: () => this.dialogRef.close(this.equipe),
        error: (err) => console.error('Erreur lors de la mise à jour de l\'équipe:', err)
      });
    } else {
      this.backendService.createEquipe(this.equipe).subscribe({
        next: (created) => this.dialogRef.close(created),
        error: (err) => console.error('Erreur lors de la création de l\'équipe:', err)
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

 
  }

