import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Projet, Status } from '../models/Projet';
import { environment } from '../environments/environment';  // Correctement relatif
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = `${environment.apiUrl}/projets`;

  constructor(private http: HttpClient) { }

  getAllProjets(page: number, size: number): Observable<Page<Projet>> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<Page<Projet>>(this.apiUrl, { params }).pipe(
      tap(data => console.log('Projets récupérés:', data))  // Ajouter ce log pour vérifier
    );
  }
  

  // Récupérer un projet par ID
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un projet
  addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }

  // Mettre à jour un projet
  updateProjet(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}`, projet);
  }

  // Supprimer un projet
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getProjetsByStatus(status: Status | null, page: number, size: number): Observable<Page<Projet>> {
    const params: any = {
      page: page.toString(),
      size: size.toString()
    };
  
    if (status !== null) {
      params.status = status.toString();  // Convertir l'enum en string
    }
  
    return this.http.get<Page<Projet>>(`${this.apiUrl}/status`, { params }).pipe(
      tap(data => console.log('Projets récupérés par statut:', data))
    );
  }
  exportProjetToPdf(idProjet: number) {
    return this.http.get(`${this.apiUrl}/${idProjet}/export-pdf`, { responseType: 'blob' });
  }
  
  
  
  

}
