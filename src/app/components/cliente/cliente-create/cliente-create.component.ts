import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  ngOnInit(): void {}

  cliente: Cliente = {
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: undefined,
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required); // pode ser um array
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toastr.success(
          "Cliente " + this.cliente.cpf + " cadastrado com sucesso!"
        ); //Mensagem de sucesso
        this.router.navigate(["/clientes"]); // redirecionamento para o  componente de clientes
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((erro) => {
            this.toastr.error(erro.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    );
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
      this.cliente.perfis.push(perfil); // Senão, será adicionad
    }
  }
}
