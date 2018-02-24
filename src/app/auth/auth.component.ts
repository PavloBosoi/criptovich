import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'ccc-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{
    constructor(private routerService: Router) {

    }

    ngOnInit() {
        this.routerService.navigate((['/login']));
    }
}