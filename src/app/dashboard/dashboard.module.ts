import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from '../maps/maps.component';

const routes: Routes = [
  { path: 'dashboard/maps', component: MapsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardModule { }
