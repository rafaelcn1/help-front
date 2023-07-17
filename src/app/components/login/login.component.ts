import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toast: ToastrService) {}

  ngOnInit(): void {
    
  }

  logar() {
    this.toast.error('Usuário e/ou Senha inválidos!', 'Login'); //Primeiro parametro é a mensagem e o segundo é o titulo   
    this.creds.email = ''
    this.creds.senha = ''
  }

  validaCampos(): boolean {
    if(this.email.valid && this.senha.valid){
      return true;
    } else {
      return false;
    }
  }
}
