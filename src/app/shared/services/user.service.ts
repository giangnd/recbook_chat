import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { StorageService } from "../../core/services/storage.service";
import { DataService } from './data.service';
import { TokenService } from './token.service';

@Injectable()
class UserService {
    user: User;
    constructor(
        private router: Router,
        private apiConnector: DataService,
        private tokenService: TokenService,
        private storageService: StorageService,
    ) { }

    login(user, callback) {
        this.apiConnector.requestAPI('post', '/auth/login', user).subscribe(response => {
            this.tokenService.setToken(response.token);
            callback(null, response);
        }, err => {
            callback(err);
        })
    }

    logout() {
        this.user = undefined;
        this.tokenService.logOut();
        const returnUrl = this.storageService.get('return-url');
        if (returnUrl) {
            this.storageService.remove('return-url');
            window.location.href = returnUrl;
        }
        else {
            this.router.navigate(['/auth/login']);
        }
    }

    get(userId = null): Observable<User> {
        if (this.user) {
            return of(this.user);
        }
        let apiUrl = '/auth/me';
        if (userId) {
            apiUrl = `/user/${userId}`;
        }
        return this.apiConnector.requestAPI('get', apiUrl).pipe(
            tap(user => {
                if (user) {
                    this.user = user;
                    this.tokenService.setUserId(user.id);
                    this.tokenService.setUserData(user);
                }
            }),
            catchError(err => {
                this.tokenService.logOut();
                this.router.navigate(['/auth/login']);
                return of(null);
            })
        );
    }
}

export { UserService, User }