
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from '../vehicule.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class VehiculeComponent implements OnInit {
  vehicules: any = [];
  vehiculeForm: FormGroup;
  addVehiculeForm: FormGroup; // Formulaire pour ajouter un véhicule
  selectedVehicule: any;
  isAdding = false; // Variable pour afficher ou masquer le formulaire d'ajout

  constructor(private vehiculeService: VehiculeService, private fb: FormBuilder) { 
    // Formulaire de mise à jour
    this.vehiculeForm = this.fb.group({
      marque: ['', Validators.required],
      matricule: ['', Validators.required],
      disponibilite: ['', Validators.required]
    });

    // Formulaire pour ajouter un véhicule
    this.addVehiculeForm = this.fb.group({
      marque: ['', Validators.required],
      matricule: ['', Validators.required],
      disponibilite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getVehicules();
  }

  getVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (data) => {
        this.vehicules = data;
      },
      (error) => {
        console.error('Erreur de récupération des véhicules', error);
      }
    );
  }

  // Afficher le formulaire d'ajout
  showAddForm(): void {
    this.isAdding = true;
  }

  // Méthode pour ajouter un nouveau véhicule
  onAdd(): void {
    if (this.addVehiculeForm.valid) {
      const newVehicule = this.addVehiculeForm.value;
      this.vehiculeService.addVehicule(newVehicule).subscribe(
        (data) => {
          console.log('Véhicule ajouté :', data);
          // Ajouter le nouveau véhicule à la liste sans recharger
          this.vehicules.push(data);
          // Réinitialiser le formulaire et masquer le formulaire d'ajout
          this.addVehiculeForm.reset();
          this.isAdding = false;
        },
        (error) => {
          console.error('Erreur d\'ajout du véhicule', error);
        }
      );
    }
  }

  // Méthode pour sélectionner un véhicule et ouvrir le formulaire
  updateVehicule(vehicule: any): void {
    this.selectedVehicule = vehicule;
    this.vehiculeForm.patchValue({
      marque: vehicule.marque,
      matricule: vehicule.matricule,
      disponibilite: vehicule.disponibilite
    });
  }

  onUpdate(): void {
    if (this.vehiculeForm.valid) {
        const updatedVehicule = {
            ...this.selectedVehicule,
            ...this.vehiculeForm.value
        };

        this.vehiculeService.updateVehicule(updatedVehicule.idVehicule, updatedVehicule).subscribe(
            (data) => {
                console.log('Véhicule mis à jour :', data);
                // Mettre à jour la liste des véhicules après la mise à jour
                const index = this.vehicules.findIndex((veh: { idVehicule: any; }) => veh.idVehicule === updatedVehicule.idVehicule);
                if (index !== -1) {
                    this.vehicules[index] = updatedVehicule;
                }
                this.selectedVehicule = null;
            },
            (error) => {
                console.error('Erreur de mise à jour du véhicule', error);
            }
        );
    }
  }

  // Méthode pour supprimer un véhicule
  deleteVehicule(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.vehiculeService.deleteVehicule(id).subscribe(
        () => {
          // Supprimer le véhicule de la liste après succès
          this.vehicules = this.vehicules.filter((vehicule: any) => vehicule.idVehicule !== id);
        },
        (error) => {
          console.error('Erreur de suppression du véhicule', error);
        }
      );
    }
  }
}