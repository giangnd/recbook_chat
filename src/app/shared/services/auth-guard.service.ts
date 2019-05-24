import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { StorageService } from "../../core/services/storage.service";
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private tokenService: TokenService,
        private storageService: StorageService,
        private location: Location
    ) {

    }
    canActivate(): Observable<boolean> | boolean {
        if (this.isLogin()) {
            return true;
        }
        const returnUrl = this.location.path() || null;
        if (returnUrl) {
            this.storageService.set('return-url', returnUrl);
        }
        this.router.navigate(['/auth/login']);
        return false;
    }

    isLogin() {
        if (!this.tokenService.isTokenValid()) {
            return false;
        }
        return true;
    }
}