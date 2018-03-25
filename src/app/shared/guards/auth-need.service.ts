import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AuthNeedGuard implements CanActivate {

  constructor(
      private router: Router,
      private firebaseAuth: AngularFireAuth
  ) { }

  canActivate(): Observable<boolean> {
    return this.firebaseAuth.authState
        .take(1)
        .map(authState => !!authState)
        .do(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        });
  }

    authState(): Observable<boolean> {
        return this.firebaseAuth.authState
            .take(1)
            .map(authState => !!authState);
    }

}
