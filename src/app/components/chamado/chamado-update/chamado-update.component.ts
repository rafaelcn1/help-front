import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-update",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent {
  constructor(
    private chamadoService: ChamadoService, // Chamar o metodo update que está no service do chamado
    private clienteService: ClienteService, // Chamar o metodo findAllClientes que está no service do cliente
    private tecnicoService: TecnicoService, // Chamar o metodo findAllTecnico que está no service do tecnico
    private router: Router, // Redirecionar a pagina após o chamado ser atualizado
    private route: ActivatedRoute, // Capturar o id da url
    private toast: ToastrService // Mensagens na página
  ) {}

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
  };

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  titulo: FormControl = new FormControl(null, Validators.minLength(3));
  cliente: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null, Validators.required);

  validaCampos(): boolean {
    return (
      this.titulo.valid &&
      this.cliente.valid &&
      this.tecnico.valid &&
      this.prioridade.valid &&
      this.status.valid
    );
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(
      () => {
        this.toast.success("Chamado Atualizado", "Update");
        this.router.navigate(["/chamados"]);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.erros.array.forEach((erro) => {
            this.toast.error(erro.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe((resposta) => {
      this.chamado = resposta;
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
          this.tecnicos = resposta;
        });
  }
}
