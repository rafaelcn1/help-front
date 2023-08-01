import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = API_CONFIG.baseUrl + '/clientes/'

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Cliente> {
    this.url = this.url + id;
    return this.http.get<Cliente>(this.url);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    this.url = this.url + cliente.id;
    return this.http.put<Cliente>(this.url, cliente);
  }

  delete(id: any): Observable<Cliente> {
    let url: string = API_CONFIG.baseUrl + 'clientes/' + id;
    return this.http.delete<Cliente>(url);
  }
}
