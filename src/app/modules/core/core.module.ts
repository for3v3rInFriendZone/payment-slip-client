import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoreNavigationComponent } from './components/core-navigation/core-navigation.component';
import { CoreFooterComponent } from './components/core-footer/core-footer.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    CoreNavigationComponent,
    CoreFooterComponent,
    DashboardComponent
  ],
  providers: [],
})
export class CoreModule { }
