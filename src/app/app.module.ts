import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEsriModule } from 'angular-esri-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEsriModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
