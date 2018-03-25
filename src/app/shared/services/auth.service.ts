import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {AuthNeedGuard} from "../guards/auth-need.service";

@Injectable()

export class AuthService {
    constructor(
        private authNeedGuard: AuthNeedGuard,
        private router: Router
    ) {
    }

    isAuthorized() {
        this.authNeedGuard.authState()
            .subscribe((result) => {
                if (result) {
                    this.router.navigate(['/system', 'announce']);
                }
            });
    }
}
