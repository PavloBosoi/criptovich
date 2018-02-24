import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";


import { AppComponent } from './app.component';
import {SystemModule} from "./system/system.module";
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from "./app-routing.module";


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
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
