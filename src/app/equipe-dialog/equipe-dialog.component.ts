import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  styleUrls: ['./equipe-dialog.component.css']
  // Remove standalone: true and imports array
})
export class EquipeDialogComponent {

  equipe: Equipe = {
    idEquipe: 0, // Initialize with a default valid value (0 or any valid ID)
    name: '', // Initialize name as empty string
    disponibilite: '',
    nomEquipe: ''
  };
  equipeForm!: FormGroup;

  constructor(
    
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EquipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService
  ) {
    // Create a form group and initialize fields based on passed equipe data
    this.equipeForm = this.fb.group({
      idEquipe: [data?.idEquipe || null],
      nomEquipe: [data?.nomEquipe || '', Validators.required],
      disponibilite: [data?.disponibilite || '', Validators.required],
    });
  }

  // Handle the form submission for either creating or updating the equipe
  onSubmit(): void {
    if (this.equipeForm.valid) {
      const equipeData = this.equipeForm.value;

      if (equipeData.idEquipe) {
        // If there's an idEquipe, perform update
        this.backendService.updateEquipe(equipeData.idEquipe, equipeData).subscribe({
          next: () => {
            this.dialogRef.close(equipeData);  // Send updated data back to parent
          },
          error: (err) => {
            console.error('Error updating equipe:', err);
          },
        });
      } else {
        // If no idEquipe, perform create
        this.backendService.createEquipe(equipeData).subscribe({
          next: (createdEquipe) => {
            this.dialogRef.close(createdEquipe);
          },
          error: (err) => {
            console.error('Error creating equipe:', err);
          },
        });
    }
  }}

  onClose(): void {
    this.dialogRef.close();
  }

 
  }