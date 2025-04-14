import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gestion-dialog',
  templateUrl: './gestion-dialog.component.html',
  styleUrls: ['./gestion-dialog.component.css']
})
export class GestionDialogComponent {

  // Constructor to inject dialog reference and data
  constructor(
    public dialogRef: MatDialogRef<GestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog
  onClose(): void {
    this.dialogRef.close();
  }

  // Edit action - you can customize this with actual logic
  editEquipe(equipe: any): void {
    console.log(`Editing equipe: ${equipe.name}`);
    // Logic for editing the equipe
  }

  // Delete action - you can customize this with actual logic
  deleteEquipe(equipe: any): void {
    console.log(`Deleting equipe: ${equipe.name}`);
    // Logic for deleting the equipe
  }
}
