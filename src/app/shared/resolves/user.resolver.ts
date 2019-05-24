import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService) {
    }
    resolve(): Promise<User> {
        return this.userService.get().toPromise();
    }
}