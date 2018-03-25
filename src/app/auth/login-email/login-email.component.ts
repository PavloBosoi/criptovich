import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

import {ValidationsService} from "../shared/services/validations.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'ccc-login-email',
  templateUrl: 'login-email.component.html',
  styleUrls: ['login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(
      private router: Router,
      private validationsService: ValidationsService,
      public firebaseAuth: AngularFireAuth,
      private authService: AuthService
  ) {
    authService.isAuthorized();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });


  }

  isFieldValid(field: string) {
    return this.validationsService.validateFields(this.loginForm.get(field));
  }

  onSubmit() {

    const email = this.loginForm.value.email,
        password = this.loginForm.value.password;

    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then((success) => {
          console.log(success);
          this.router.navigate(['/system','rich-list']);
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code,
              errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
  }

}
