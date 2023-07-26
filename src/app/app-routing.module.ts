import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';



const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',component: NavComponent,  canActivate: [authGuard], children: [
      {path: 'home',component: HomeComponent},
      {path: 'tecnicos',component: TecnicoListComponent},
      {path: 'tecnicos/create',component: TecnicoCreateComponent}, // quando for acessado a url tecnicos/create será reinderizado o TecnicoCreateComponent
      {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent} // quando for acessado a url tecnicos/update será reinderizado o TecnicoUpdateComponent, o /:id será a variavel da path 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
