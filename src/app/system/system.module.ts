import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SystemComponent} from "./system.component";
import {AnnounceComponent} from "./announce/announce.component";
import {SystemRoutingModule} from "./system-routing.module";
import {AnnounceService} from "../shared/services/announce.service";

@NgModule({
    declarations: [
        AnnounceComponent,
        SystemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SystemRoutingModule
    ],
    providers: [
        AnnounceService
    ]
})
export class SystemModule {

}