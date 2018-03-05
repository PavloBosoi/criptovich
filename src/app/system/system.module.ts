import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {SystemComponent} from "./system.component";
import {AnnounceComponent} from "./announce/announce.component";
import {SystemRoutingModule} from "./system-routing.module";
import {AnnounceService} from "../shared/services/announce.service";
import { RichListComponent } from './rich-list/rich-list.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
    declarations: [
        AnnounceComponent,
        SystemComponent,
        RichListComponent,
        HeaderComponent
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