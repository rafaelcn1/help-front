import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-delete",
  templateUrl: "./cliente-delete.component.html",
  styleUrls: ["./cliente-delete.component.css"],
})
export class ClienteDeleteComponent implements OnInit {
  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.findById();
  }

  cliente: Cliente = {
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: undefined,
  };

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  findById(): void {
    this.service.findById(this.cliente.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe((resposta) => {
      this.toastr.success("Cliente excluído com sucesso!");
      this.router.navigate(["/clientes"]);
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(erro => {
          this.toastr.error(erro.message);
        })
      } else {
        this.toastr.error(ex.error.message);
      }
    });
  }
}
