import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    dataAbertura: '',
    dataFechamento: '',
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeTecnico: '',
    nomeCliente: ''
  };

  titulo: FormControl = new FormControl(null, Validators.minLength(3));
  nomeCliente: FormControl = new FormControl(null, Validators.required);
  nomeTecnico: FormControl = new FormControl(null, Validators.required);
  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  observacoes: FormControl = new FormControl(null);

  ngOnInit(): void {
  }

  create(): void {
    console.log(this.chamado);
  }

  validaCampos(): boolean {
    return (
      this.titulo.valid && this.nomeCliente.valid && this.nomeTecnico.valid && this.prioridade.valid && this.status.valid
    );
  }

}
