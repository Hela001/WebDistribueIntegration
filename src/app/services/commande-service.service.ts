import { Injectable } from '@angular/core';
import { Commande } from '../Modele/commande.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {
  private baseUrl = 'http://localhost:8091/Commande'; // URL via API Gateway

  constructor(private http: HttpClient) {}
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}`)
  }
  


  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/getCommandeById/${id}`);
  }
  addCommande(commande: Commande): Observable<Commande> {

    return this.http.post<Commande>(`${this.baseUrl}/add`, commande );
  }

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      catchError((error) => {
        console.error('DELETE error:', error);
        // Optionally handle specific error status codes here
        return throwError(error);
      })
    );
  }
  
  
getCommandesByStatut(statut: string): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/statut/${statut}`);
  }
  getCommandesByDateCommande(date: string): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/commande/${date}`);
  }
  
}
