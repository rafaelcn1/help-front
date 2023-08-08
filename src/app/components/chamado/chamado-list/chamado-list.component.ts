import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
  ELEMENT_DATE: Chamado[] = [
    {
      id: 1,
      dataAbertura: '2020-01-01',
      dataFechamento: '2020-01-01',
      prioridade: 'Alta',
      status: 'Aberto',
      titulo: 'Chamado 1',
      tecnico: 1,
      cliente: 1,
      nomeTecnico: 'Rafael',
      nomeCliente: 'Amnanda',
      observacoes: 'Observações'
    }
  ];
  
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATE);  

  displayColumns: string[] = ['id', 'titulo', 'nomeCliente', 'dataAbertura', 'prioridade', 'status', 'acoes'];


  @ViewChild(MatPaginator) paginator: MatPaginator;


  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
