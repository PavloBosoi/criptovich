import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SystemComponent} from "./system.component";
import {AnnounceComponent} from "./announce/announce.component";
import {SystemRoutingModule} from "./system-routing.module";
import {AnnounceService} from "../shared/services/announce.service";
import { RichListComponent } from './rich-list/rich-list.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {MaterialCustomModule} from "../shared/material-custom.module";
import { AddressesComponent } from './rich-list/addresses/addresses.component';
import { TotalComponent } from './rich-list/total/total.component';
import {SharedDataService} from "./shared/services/shared-data.service";

@NgModule({
    declarations: [
        AnnounceComponent,
        SystemComponent,
        RichListComponent,
        HeaderComponent,
        AddressesComponent,
        TotalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemRoutingModule,
        MaterialCustomModule
    ],
    providers: [
        AnnounceService,
        SharedDataService
    ]
})
export class SystemModule {

}