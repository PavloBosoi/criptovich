import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import 'hammerjs';


import { AppComponent } from './app.component';
import {SystemModule} from "./system/system.module";
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";
import {DbService} from "./shared/services/db.service";
import {MaterialCustomModule} from "./shared/material-custom.module";
import {DataService} from "./shared/services/data.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SystemModule,
    AuthModule,
    AppRoutingModule,
    MaterialCustomModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    ClarityModule
  ],
  exports: [

  ],
  providers: [
    DbService,
    DataService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
