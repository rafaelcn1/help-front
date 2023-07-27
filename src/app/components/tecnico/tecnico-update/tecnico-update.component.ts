import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute // Consegue dar um GET na url, para pegar o id por exemplo
  ) {}
  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id'); // Toda vez que o component iniciar, vai chamar o route, dando um snapshot (captar) o paramMap (no caso o ID), via o get
    this.findById(); // Para já executar a consulta
  }

  validaCampos(): boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => { //Pegar a resposta do servidor
      resposta.perfis= []; //Sempre que a resposta chegar vai receber um array vazio
      this.tecnico = resposta; // Salvar a reposta (o tecnico consultado) e atribuir ao this.tecnico
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => { //Se inscrever e quando a resposta chegar, chamar a função, para cadastrar o tecnico
      this.toast.success("Técnico Atualizado com Sucesso!", "Update"); //Caso de sucesso
      this.router.navigate(['/tecnicos']);
    }, ex =>{ // Em caso de não cadastrar o usuário
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
