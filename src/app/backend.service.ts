import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from './models/equipe';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  private apiUrl = 'http://localhost:8083/api/equipes'; // URL of your Spring Boot API

  constructor(private http: HttpClient) { }
  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.apiUrl);
  }
  
  createEquipe(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.apiUrl, equipe);
  }
  
  updateEquipe(id: number, equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.apiUrl}/${id}`, equipe);
  }
  
  deleteEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getData`);
  }
  submitData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitData`, data);}
}
