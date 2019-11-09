import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';
import { UserService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private UserService: UserService,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    //     if(localStorage.getItem('token') != null){
    //         let roles = route.data['permittedRoles'] as Array<String>;
    //         if(roles){
    //             if(this.UserService.roleMatch(roles)) return true
    //         }
    //         return true;
    //     }else{
    //         this.router.navigate(['/login']);
    //         return false;
    //     }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}