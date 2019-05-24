import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() { }

    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: any) {
        localStorage.setItem(key, value);
    }
    
    remove(key: string) {
        localStorage.removeItem(key);
    }

    setObject(key: string, value: Object) {
        if (value) {
            this.set(key, JSON.stringify(value));
        }
    }

    getObject(key: string) {
        const value = this.get(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }
}