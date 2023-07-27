import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  
  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: undefined
  };

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

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => { //Pegar a resposta do servidor
      resposta.perfis= []; //Sempre que a resposta chegar vai receber um array vazio
      this.tecnico = resposta; // Salvar a reposta (o tecnico consultado) e atribuir ao this.tecnico
    })
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(resposta => { //Assinar e obter a resposta
      this.toast.success("Técnico deletado com sucesso!", "Deletado"); // Mensagem de sucesso e cabeçalho
      this.router.navigate(['/tecnicos']); // Redirecionar para a rota tecnicos, no caso a url localhos:8080/tecnicos
    }, ex => { //Caso de error
      if(ex.error.errors) { // Se tiver mais de um error
        ex.error.errors.forEach(element => { // Fazer um foreach no array de errors
          this.toast.error(element.message) // lançar a mensagem de error
        })
      } else { // Tem apenas 1 erro
        this.toast.error(ex.error.message) // lançar a mensagem de error
      }
    });
  }

}
