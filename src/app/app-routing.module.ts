import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing-pages/home/home.component';
import { CadastroComponent } from './sistema/components/cadastro/cadastro.component';
import { UserHomeComponent } from './sistema/user/user-home/user-home.component';
import { AdminHomeComponent } from './sistema/admin/admin-home/admin-home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'admin-home', component: AdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
