import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Facture } from '../models/facture';
import { environment } from '../environments/environment';  // Correctement relatif
import { Page } from '../models/page.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  //private apiUrl = `${environment.apiUrl}/factures`; // Utilisez l'URL de l'environnement
  private apiUrl = 'http://localhost:8081/factures';
  // Adjust this URL if necessary
  private facturesSubject = new BehaviorSubject<Facture[]>([]);
  factures$ = this.facturesSubject.asObservable();

  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) { }


  getAll(page: number = 0, size: number = 10): Observable<Page<Facture>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page<Facture>>(this.apiUrl, { params }).pipe(
      tap(data => console.log('Factures récupérées :', data)),
    );
  }
  

  get(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${id}`);
  }

  create(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(this.apiUrl, facture).pipe(
      tap((newFacture) => {
        console.log('Nouvelle facture ajoutée:', newFacture); // Debugging
  
        // Ajouter une notification
        const notification = `Nouvelle facture ajoutée: ${newFacture.id_facture}`;
        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, notification]);
        console.log('Notifications mises à jour:', this.notificationsSubject.value); // Debugging
  
        // Ajouter un message
        const message = `Une nouvelle facture a été ajoutée avec l'ID: ${newFacture.id_facture}`;
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, message]);
        console.log('Messages mis à jour:', this.messagesSubject.value); // Debugging
      })
    );
  }
 
  update(id: number, facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiUrl}/${id}`, facture);
  }

  deleteFacture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchByNumero(numero: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}/search?numero=${numero}`);
  }

  getPdf(id_facture: number){
    return this.http.get(`${this.apiUrl}/${id_facture}pdf/`, { responseType: 'blob' });
  }
}