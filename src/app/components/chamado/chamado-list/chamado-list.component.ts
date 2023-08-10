import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Chamado } from "src/app/models/chamado";
import { ChamadoService } from "src/app/services/chamado.service";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  FILTER_ELEMENT_DATE: any[];
  constructor(private service: ChamadoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  ELEMENT_DATE: Chamado[] = [];

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATE);

  displayColumns: string[] = [
    "id",
    "titulo",
    "cliente",
    "tecnico",
    "dataAbertura",
    "prioridade",
    "status",
    "acoes",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATE = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATE);
      this.dataSource.paginator = this.paginator;
    });
  }

  orderByStatus(status: any): void {
    let list = []; // Iniciando uma lissta vazia
    this.ELEMENT_DATE.forEach(element => {
      if(element.status === status){
        list.push(element);
      }
    });
    this.FILTER_ELEMENT_DATE = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
}
