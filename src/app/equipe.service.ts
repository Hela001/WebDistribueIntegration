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
  getEquipeById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.apiUrl}/${id}`);
  
    }
  // Fetch all equipes from the backend
  getAllEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.apiUrl);
  }
}
