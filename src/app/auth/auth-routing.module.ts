import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {LoginEmailComponent} from './login-email/login-email.component';
import {AuthNeedGuard} from '../shared/guards/auth-need.service';

const routes: Routes = [
    {path: '', component: AuthComponent, children: [
        {path: 'login', component: LoginComponent},
        {path: 'login-email', component: LoginEmailComponent},
        {path: 'registration', component: RegistrationComponent}
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
export class AuthRoutingModule {

}
