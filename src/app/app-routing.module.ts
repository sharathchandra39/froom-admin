import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FroomAdminComponent } from './components/froom-admin/froom-admin/froom-admin.component';
import { FroomLocationsComponent } from './components/froom-admin/froom-locations/froom-locations.component';
import { FroomOrdersComponent } from './components/froom-admin/froom-orders/froom-orders.component';
import { HomeComponent } from './components/home/home.component';
import { MerchantMgmtComponent } from './components/merchant/merchant-mgmt/merchant-mgmt.component';
import { ApppageComponent } from './pages/apppage/apppage.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'froom-orders',
    component: FroomOrdersComponent 
  },

  {
    path: 'froom-locations',
    component: FroomLocationsComponent 
  },
  {
    path:'merchant-updates',
    component: MerchantMgmtComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
