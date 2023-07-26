import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: undefined
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required); // pode ser um array
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));


  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {}

  validaCampos(): boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => { //Se inscrever e quando a resposta chegar, chamar a função, para cadastrar o tecnico
      this.toast.success("Técnico Cadastrado com Sucesso!", "Cadastro"); //Caso de sucesso
      this.router.navigate(['/tecnicos']);
    }, ex =>{ // Em caso de não cadastrar o usuário
      console.log(ex)
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        })
      } else {
        this.toast.error(ex.error.message)
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)){ // Se ao clicar o checkbox já estiver na lista de perfil
      this.tecnico.perfis.slice(this.tecnico.perfis.indexOf(perfil), 1); // Será removido, o 1 quer dizer que será apenas o 1º caso
    } else {
      this.tecnico.perfis.push(perfil); // Senão, será adicionado
    }    
  }
}
