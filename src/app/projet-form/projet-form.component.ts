import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet, Status } from '../models/Projet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet'; // Importer Leaflet

@Component({
  selector: 'app-projet-form',
  templateUrl: './projet-form.component.html'
})
export class ProjetFormComponent implements OnInit {
  projetForm!: FormGroup;
  projetId!: number | null;
  isEdit = false;
  statuses = Object.values(Status);

  marker!: L.Marker;
  map!: L.Map;
  latitude: number | undefined;
  longitude: number | undefined;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  mapReady = false;

ngOnInit(): void {
  this.projetForm = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    status: [Status.DOING, Validators.required],
    latitude: [this.latitude, Validators.required],
    longitude: [this.longitude, Validators.required]
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.isEdit = true;
    this.projetId = Number(idParam);
    this.projetService.getProjetById(this.projetId).subscribe(projet => {
      this.projetForm.patchValue(projet);
      this.latitude = projet.latitude;
      this.longitude = projet.longitude;
      this.mapReady = true;
      setTimeout(() => this.initializeMap(), 0);
    });
  } else {
    this.latitude = 36.8065;
    this.longitude = 10.1815;
    this.mapReady = true;
    setTimeout(() => this.initializeMap(), 0);
  }
}


  initializeMap(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([36.8065, 10.1815], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.projetForm.patchValue({
        latitude: position.lat,
        longitude: position.lng
      });
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.projetForm.patchValue({ latitude: lat, longitude: lng });
      this.marker.setLatLng([lat, lng]);
    });
  }

  onSubmit(): void {
    const projet: Projet = this.projetForm.value;

    // Ajouter ou mettre à jour le projet en fonction de la situation (création ou édition)
    if (this.isEdit && this.projetId !== null) {
      this.projetService.updateProjet(this.projetId, projet).subscribe(() => {
        this.router.navigate(['/']); // Redirection après la mise à jour
      });
    } else {
      this.projetService.addProjet(projet).subscribe(() => {
        this.router.navigate(['/']); // Redirection après l'ajout
      });
    }
  }

  navigateToHome(): void {
    // Logic to navigate to the home page
    this.router.navigate(['/projets']);
  }
}
