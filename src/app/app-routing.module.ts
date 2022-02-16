import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './COMPONENTS/empleado/empleado.component';
import { DetailUserComponent } from './COMPONENTS/detail-user/detail-user.component';
const routes: Routes = [
  {path:'',redirectTo:'empleado',pathMatch:'full'},
  {path:'empleado',component:EmpleadoComponent},
  {path:'detail/:id',component: DetailUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
