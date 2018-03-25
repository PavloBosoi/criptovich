import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ClarityModule} from '@clr/angular';

import {HeaderComponent} from './components/header/header.component';
import {SharedRoutingModule} from './shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    ClarityModule,
    SharedRoutingModule
  ],
  declarations: [
      HeaderComponent
  ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule { }
