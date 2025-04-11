import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Materiel {
  idMateriel?: number;
  nomMateriel: string;
  quantite: number;
  prixMateriel: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaterielServiceService {
  private baseUrl = 'http://localhost:8093/job'; 
  constructor(private http: HttpClient) { }

  getAllMateriels(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}`);
  }

  getMaterielById(id: number): Observable<Materiel> {
    return this.http.get<Materiel>(`${this.baseUrl}/${id}`);
  }

  addMateriel(materiel: Materiel): Observable<Materiel> {
    return this.http.post<Materiel>(`${this.baseUrl}/add`, materiel);
  }

  updateMateriel(id: number, materiel: Materiel): Observable<Materiel> {
    return this.http.put<Materiel>(`${this.baseUrl}/update/${id}`, materiel);
  }

  deleteMateriel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getMaterielsSortedByPrice(order: 'asc' | 'desc'): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/sortedByPrice?order=${order}`);
  }

  sendTestEmail(): Observable<string> {
    return this.http.get(`${this.baseUrl}/send-test-email`, { responseType: 'text' });
  }

  searchMateriels(nom: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/search?nom=${nom}`);
  }
}
