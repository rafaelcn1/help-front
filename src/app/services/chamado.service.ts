import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';
import { Observable } from 'rxjs/internal/Observable';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private apiUrl = API_CONFIG.baseUrl + '/chamados';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }
}
