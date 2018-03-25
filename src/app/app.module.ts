import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';


import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {DbService} from './shared/services/db.service';
import {DataService} from './shared/services/data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule
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
