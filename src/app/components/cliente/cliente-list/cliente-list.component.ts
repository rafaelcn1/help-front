import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements AfterViewInit {
  ELEMENT_DATE: Cliente[] = [];

  displayColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATE);  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService){}
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.findAll();    
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      console.log(resposta)
      this.ELEMENT_DATE = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
