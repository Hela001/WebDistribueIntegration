// src/app/auth/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';  // Assurez-vous que UserService a la méthode pour obtenir l'utilisateur
import { tap,map } from 'rxjs/operators';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si l'utilisateur a un rôle admin
    return this.userService.getUserProfile().pipe(
      tap(user => {
        if (!user || user.role !== 'ROLE_ADMIN') {
          // Si l'utilisateur n'est pas un admin, redirige vers la page d'accueil ou une autre page
          this.router.navigate(['/home']);
        }
      }),
      map(user => user && user.role === 'ROLE_ADMIN')  // Retourne true si l'utilisateur est un admin
    );
  }
}
