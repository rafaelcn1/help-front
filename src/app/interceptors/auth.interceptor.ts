import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
          const cloneReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`) //Inseri o Authorization' e 'Bearer'+ token
          });
          return next.handle(cloneReq); // Retornar o handle com a requisição clonada, mas agora com o Authorization e o token
    } else {
      return next.handle(request);
    }
  }
}

export const authInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor, //Qual vai ser a classe que vai ser usada, no caso a AuthInterceptor
  multi: true //Conf necessária para avisar ao angular que HTTP interceptor é token para um multiprovedor
}]
