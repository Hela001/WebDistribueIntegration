import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Equipe } from './models/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  [x: string]: any;
  
  private apiUrl = 'http://localhost:8083/api/equipes';  // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}
  // Get one equipe by ID
  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.apiUrl}/${id}`);
  }
  // Fetch all equipes from the backend
  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.apiUrl);
  }
  // Update an existing equipe
  updateEquipe(id: number, equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.apiUrl}/${id}`, equipe).pipe(
      catchError((error) => {
        console.error('Error updating equipe:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  // Delete an equipe by ID
  deleteEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting equipe:', error);
        return throwError(() => new Error(error));
      })
    );
  
}}
