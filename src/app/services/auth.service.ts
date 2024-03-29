import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { }

  authenticate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text' // o Token que é gerado é do tipo String e grande
    })
  }

  successFulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token); //Verificar se o token está expirado ou não, se tiver return false
    }
    return false
  }

  logout(){
    localStorage.clear();
  }
}
