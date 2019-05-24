import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class UnAuthGuardService implements CanActivate {
    constructor(private tokenService: TokenService, private router: Router) {

    }
    canActivate(): Observable<boolean> | boolean {
        if (!this.tokenService.isTokenValid()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}