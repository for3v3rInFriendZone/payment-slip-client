import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExternalPagesModuleRoutingModule } from './external-pages-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ExternalPagesModuleRoutingModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    PageNotFoundComponent
  ]
})
export class ExternalPagesModule { }
