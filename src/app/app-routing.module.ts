import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './route-guards/auth-guard.service';
import { DashboardComponent } from './modules/core/layouts/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'external/login',
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      base: true
    },
    component: DashboardComponent
  },
  {
    path: 'external',
    loadChildren: './modules/external-pages/external-pages.module#ExternalPagesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
