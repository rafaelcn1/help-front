import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado.service";

@Component({
  selector: "app-chamado-read",
  templateUrl: "./chamado-read.component.html",
  styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
  };

  constructor(
    private chamadoService: ChamadoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe((resposta) => {
      this.chamado = resposta;
    });
  }
}
