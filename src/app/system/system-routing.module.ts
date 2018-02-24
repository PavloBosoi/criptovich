import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AnnounceComponent} from "./announce/announce.component";
import {SystemComponent} from "./system.component";

const routes: Routes = [
    {path: '', component: SystemComponent, children: [
        {path: 'announce', component: AnnounceComponent}
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