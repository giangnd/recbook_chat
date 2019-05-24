import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from "../../core/services/storage.service";
const helper = new JwtHelperService();

@Injectable()
export class TokenService {
    token: string = 'token';
    userId: string = 'user_id';
    userData: string = 'user_data';

    constructor(
        private storageService: StorageService,
    ) { }

    setToken(token) {
        this.storageService.set(this.token, token);
    }

    getToken() {
        return this.storageService.get(this.token);
    }

    removeToken() {
        this.storageService.remove(this.token);
    }

    isTokenValid(token: string = null) {
        if (!token) {
            token = this.getToken();
        }
        if (token) {
            return helper.isTokenExpired(token, 18000);
        }
        return false;
    }

    setUserData(user) {
        this.storageService.setObject(this.userData, user);
    }

    setUserId(userId) {
        this.storageService.set(this.userId, userId);
    }

    getUserId() {
        return this.storageService.get(this.userId);
    }

    removeUserId() {
        this.storageService.remove(this.userId);
    }

    removeUserData() {
        this.storageService.remove(this.userData);
    }

    logOut() {
        this.removeUserId();
        this.removeUserData();
        this.removeToken();
    }
}