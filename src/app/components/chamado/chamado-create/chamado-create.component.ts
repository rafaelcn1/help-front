import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  //Adicionar uma lista de tecnicos e clientes para carregar todos para serem listados
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  // Interface Chamado
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: ""
  };

  //Atributos do formulario do chamado-create
  titulo: FormControl = new FormControl(null, Validators.minLength(3));
  cliente: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null);

  //Toda vez que for iniciada essa página, será chamado os metodos dentro
  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  // Listar todos os clientes cadastrados
  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  // Listar todos os tecnicos cadastrados
  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }
  create(): void {

    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success("cadastrado com sucesso!", "Chamado");
      this.router.navigate(["/chamados"]);
    }, ex => {
      this.toastService.error(ex.error.error, "Chamado não cadastrado");
    })
  }

  validaCampos(): boolean {
    return (
      this.titulo.valid &&
      this.cliente.valid &&
      this.tecnico.valid &&
      this.prioridade.valid &&
      this.status.valid
    );
  }
}
