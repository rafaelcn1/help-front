import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email); //Validando se é um email com o @
  senha = new FormControl(null, Validators.minLength(3)); //Validando se a senha tenha pelo menos 3 caract.
  //service: any;

  constructor(
    private toast: ToastrService, 
    private service: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    
  }

  logar() {
    //this.toast.error('Usuário e/ou Senha inválidos!', 'Login'); //Primeiro parametro é a mensagem e o segundo é o titulo   
    //this.creds.email = ''
    //this.creds.senha = ''
   this.service.authenticate(this.creds).subscribe(resposta => {
      //this.toast.info(resposta.headers.get('Authorization'))
      this.service.successFulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => { // Passando uma função vazia
      this.toast.error('Usuário e/ou Senha inválidos!', 'Login'); //Retornar uma mensagem de error!
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
