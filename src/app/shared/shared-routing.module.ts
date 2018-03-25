import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
    {path: 'system', loadChildren: '../system/system.module#SystemModule'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SharedRoutingModule {

}
