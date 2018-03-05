import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AnnounceComponent} from "./announce/announce.component";
import {SystemComponent} from "./system.component";
import {RichListComponent} from "./rich-list/rich-list.component";

const routes: Routes = [
    {path: 'system', component: SystemComponent, children: [
        {path: 'announce', component: AnnounceComponent},
        {path: 'rich-list', component: RichListComponent}
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