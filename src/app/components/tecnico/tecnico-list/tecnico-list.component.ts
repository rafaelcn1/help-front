import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements AfterViewInit {

  /*ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Rafael Cunha',
      cpf: '123.456.789-10',
      email: 'rafaelcn1@mail.com',
      senha: '123',
      perfis: ['0'],
      dataCriacao: '07/06/2023'
    },
    {
      id: 2,
      nome: 'Gilberto Cruz',
      cpf: '987.654.321-00',
      email: 'gilberto@mail.com',
      senha: '456',
      perfis: ['1', '0'],
      dataCriacao: '07/06/2023'
    }
  ]*/

  ELEMENT_DATA: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
   //this.dataSource.paginator = this.paginator;
  }
  constructor(private service: TecnicoService){}


  findAll(){
    this.service.findAll().subscribe(resposta => { // Quando for executado o metodo e a resposta do servidor chegar, sera inscrito (subscribe), esperando a resposta
      this.ELEMENT_DATA = resposta //Quando a resposta chegar, irá preencher o ELEMENT_DATA que é um array ([]) com a resposta que chegou, que também é um array
      //this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
      // OU já passa a resposta, pois é do mesmo tipo
      this.dataSource = new MatTableDataSource<Tecnico>(resposta);
      this.dataSource.paginator = this.paginator; // Paginação
    });
  }

  ngOnInit(): void {
    this.findAll();
  }


}


/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];*/
