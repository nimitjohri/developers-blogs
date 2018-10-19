import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('jwtToken')) {
            console.log(localStorage.getItem('jwtToken'));
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/login');
        return false;
    }

}
