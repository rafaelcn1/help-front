import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class authGuard {
  constructor(private authService: AuthService ,private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
      let authenticate = this.authService.isAuthenticated();
      if(authenticate){
        return true;
      } else {
        this.router.navigate(['login']); // Se não tiver autenticado vai redirecionar para a pagina login
        return false;
      }
  }
}

