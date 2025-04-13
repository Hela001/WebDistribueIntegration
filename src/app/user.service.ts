import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app/Models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8087/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user, { withCredentials: true });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAll`, { withCredentials: true });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`, { withCredentials: true });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/user/${id}`, user, { withCredentials: true });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
  }
  // user.service.ts

/*getUserInfo(): Observable<any> {
  return this.http.get('/api/users/me');  // End-point qui retourne les informations de l'utilisateur connecté
}*/
getUserInfo(): Observable<any> {
  return this.http.get(`${this.apiUrl}/me`, { withCredentials: true });  // Correcte l'URL avec /me
}
// user.service.ts


/*getUserProfile() {
  return this.http.get<User>('/api/users/profile', { withCredentials: true });
}*/
getUserProfile(): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/profile`, { withCredentials: true });
}
logout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
    tap(() => {
      // Effacer les informations utilisateur stockées localement
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    })
  );
}
registerWithCaptcha(payload: any) {
  return this.http.post(`${this.apiUrl}/add-recaptcha`, payload);
}


// 🚪 Déconnexion (classique ou Google)

}




  
