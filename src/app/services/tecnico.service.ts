import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    //this.http.get<Tipo_do_Retorno>(<URL do Find by Id> + id);
    return this.http.get<Tecnico>(API_CONFIG.baseUrl + '/tecnicos/' + id);
  }

  findAll(): Observable<Tecnico[]> { //Vai retornar um Observable com Array de Tecnicos
    return this.http.get<Tecnico[]>(API_CONFIG.baseUrl + '/tecnicos/'); //Acessar a url do REST que retorna todos os tecnicos
  }

  create(tecnico: Tecnico): Observable<Tecnico> { //Passando um tecnico como parametro e esperar um retorno Observable de tecnico
    return this.http.post<Tecnico>(API_CONFIG.baseUrl + "/tecnicos/", tecnico); //No post é o tipo do Tecnico que está
  }

  update(tecnico: Tecnico): Observable<Tecnico> { //Poderia ser void, para seguir o padrão, está retornando o Observable<Tecnico>
    //this.http.put<Tecnico>(<url> + <id>, <corpo>);
    return this.http.put<Tecnico>(API_CONFIG.baseUrl + "/tecnicos/" + tecnico.id, tecnico);
  }

  delete(id: any): Observable<Tecnico> { //Poderia ser void, para seguir o padrão, está retornando o Observable<Tecnico>
    //this.http.put<Tecnico>(<url> + <id>, <corpo>);
    return this.http.delete<Tecnico>(API_CONFIG.baseUrl + "/tecnicos/" + id);
  }
}
