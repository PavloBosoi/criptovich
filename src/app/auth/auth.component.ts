import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'ccc-auth',
    styleUrls: ['./auth.component.scss'],
    templateUrl: './auth.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit{
    constructor(private routerService: Router) {

    }

    ngOnInit() {
        this.routerService.navigate((['/login']));
    }
}