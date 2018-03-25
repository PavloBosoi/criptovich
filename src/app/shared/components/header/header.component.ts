import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'ccc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
      private router: Router,
      public firebaseAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }

  logout() {
    this.firebaseAuth.auth.signOut()
        .then((success) => {
          console.log('Logout:', success);
        })
        .catch(function(error) {
          console.log(error);
        });
    this.router.navigate(['/login']);
  }


}
