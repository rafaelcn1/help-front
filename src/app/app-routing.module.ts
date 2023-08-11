import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';



const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',component: NavComponent,  canActivate: [authGuard], children: [
      {path: 'home',component: HomeComponent},
      {path: 'tecnicos',component: TecnicoListComponent},
      {path: 'tecnicos/create',component: TecnicoCreateComponent}, // quando for acessado a url tecnicos/create será reinderizado o TecnicoCreateComponent
      {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent}, // quando for acessado a url tecnicos/update será reinderizado o TecnicoUpdateComponent, o /:id será a variavel da path para buscar o tecnico que será atualizado
      {path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent}, // quando for acessado a url tecnicos/delete será reinderizado o TecnicoDeleteComponent, o /:id será a variavel da path para buscar o tecnico que será atualizado
     
     // Quando acessar a url clientes, será reinderizado o componente ClienteListComponent
      {path: 'clientes',component: ClienteListComponent},
      {path: 'clientes/create',component: ClienteCreateComponent},
      {path: 'clientes/update/:id', component: ClienteUpdateComponent},
      {path: 'clientes/delete/:id', component: ClienteDeleteComponent},

      // Quando acessar a url chamados, será reinderizado o componente ChamadoListComponent
      {path: 'chamados', component: ChamadoListComponent},
      {path: 'chamados/create', component: ChamadoCreateComponent},
      {path: 'chamados/update/:id', component: ChamadoUpdateComponent},
      {path: 'chamados/read/:id', component: ChamadoReadComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
