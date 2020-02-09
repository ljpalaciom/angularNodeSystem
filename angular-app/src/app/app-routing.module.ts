import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataVisualizationComponent } from './components/data-visualization/data-visualization.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  { path: 'data', component: DataVisualizationComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: 'registration', component: RegistrationComponent,  pathMatch: 'full'},
  {path : '', component : LoginComponent},
  {path : '**', component : LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
