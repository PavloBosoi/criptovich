import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AnnounceComponent} from "./announce/announce.component";
import {SystemComponent} from "./system.component";
import {RichListComponent} from "./rich-list/rich-list.component";
import {AuthNeedGuard} from "../shared/guards/auth-need.service";

const routes: Routes = [
    {path: '', component: SystemComponent, children: [
        {path: 'announce', component: AnnounceComponent, canActivate: [AuthNeedGuard]},
        {path: 'rich-list', component: RichListComponent, canActivate: [AuthNeedGuard]}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class SystemRoutingModule {

}