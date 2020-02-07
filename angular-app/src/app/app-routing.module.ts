import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataVisualizationComponent } from './components/data-visualization/data-visualization.component';


const routes: Routes = [
  { path: 'data', component: DataVisualizationComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  {path : '', component : LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
