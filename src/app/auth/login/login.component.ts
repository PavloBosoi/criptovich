import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";

import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'ccc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private router: Router,
      public firebaseAuth: AngularFireAuth,
      private authService: AuthService
  ) {
      authService.isAuthorized();
  }

  ngOnInit() {

  }

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
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

  loginWithFacebook() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
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
