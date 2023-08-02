import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: undefined,
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute // Consegue dar um GET na url, para pegar o id por exemplo
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      // Se ao clicar o checkbox já estiver na lista de perfil
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1); // Será removido, o 1 quer dizer que será apenas o 1º caso
    } else {
      this.cliente.perfis.push(perfil); // Senão, será adicionado
    }
  }

  
  update(): void {   
    this.service.update(this.cliente).subscribe(
      () => {
        //Se inscrever e quando a resposta chegar, chamar a função, para cadastrar o tecnico
        this.toast.success("Cliente Atualizado com Sucesso!", "Update"); //Caso de sucesso
        this.router.navigate(["/clientes"]);
      },
      (ex) => {
        // Em caso de não cadastrar o usuário
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

}
