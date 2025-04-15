import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:3000/api'; // L'URL de base de votre API backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les véhicules
  getVehicules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicules`);
  }

  // Méthode pour ajouter un véhicule
  addVehicule(vehicule: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehicules/add/vehicules`, vehicule);
  }

  // Méthode pour mettre à jour un véhicule
  updateVehicule(id: number, vehicule: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/vehicules/${id}`, vehicule);
  }

  // Méthode pour supprimer un véhicule
  deleteVehicule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vehicules/${id}`);
  }
}
