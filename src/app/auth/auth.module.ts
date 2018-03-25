import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {AuthNeedGuard} from "../shared/guards/auth-need.service";

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import { LoginEmailComponent } from './login-email/login-email.component';
import {ValidationsService} from './shared/services/validations.service';
import {AuthService} from "../shared/services/auth.service";

@NgModule({

  declarations: [
      LoginComponent,
      RegistrationComponent,
      AuthComponent,
      LoginEmailComponent
  ],
  imports: [
      CommonModule,
      AuthRoutingModule,
      ReactiveFormsModule,
      AngularFontAwesomeModule
  ],
    providers: [
        AngularFireAuth,
        ValidationsService,
        AuthNeedGuard,
        AuthService
    ]
})
export class AuthModule {

}