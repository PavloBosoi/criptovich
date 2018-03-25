import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {SystemComponent} from './system.component';
import {AnnounceComponent} from './announce/announce.component';
import {SystemRoutingModule} from './system-routing.module';
import {AnnounceService} from '../shared/services/announce.service';
import { RichListComponent } from './rich-list/rich-list.component';
                 import {MaterialCustomModule} from '../shared/material-custom.module';
import { AddressesComponent } from './rich-list/addresses/addresses.component';
import { TotalComponent } from './rich-list/total/total.component';
import {SharedDataService} from './shared/services/shared-data.service';
import {AuthNeedGuard} from '../shared/guards/auth-need.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        AnnounceComponent,
        SystemComponent,
        RichListComponent,
        AddressesComponent,
        TotalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemRoutingModule,
            MaterialCustomModule,
        ClarityModule,
        AngularFontAwesomeModule,
        SharedModule
    ],
    providers: [
        AnnounceService,
        SharedDataService,
        AuthNeedGuard
    ]
})
export class SystemModule {

}
