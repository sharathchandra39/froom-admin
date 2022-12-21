import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { ApppageComponent } from './pages/apppage/apppage.component';
import { FroomAdminComponent } from './components/froom-admin/froom-admin/froom-admin.component';
import { FroomOrdersComponent } from './components/froom-admin/froom-orders/froom-orders.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FroomLocationsComponent } from './components/froom-admin/froom-locations/froom-locations.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    HomeComponent,
    SideNavContentComponent,
    ApppageComponent,
    FroomAdminComponent,
    FroomOrdersComponent,
    FroomLocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
