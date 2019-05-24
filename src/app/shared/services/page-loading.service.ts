import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PageLoadingService {
    private _subjectLoad = new BehaviorSubject<string>('');
    private _ignoreLoad: boolean = false;
    public eventLoading: Observable<any> = this._subjectLoad.asObservable();

    public start() {
        this._subjectLoad.next('start');
    }

    public complete() {
        this._subjectLoad.next('complete');
    }

    public ignoreLoadingBar() {
        this._ignoreLoad = true;
    }

    public setLoadingBar() {
        this._ignoreLoad = false;
    }

    public isIgnoreLoadingBar() {
        return this._ignoreLoad;
    }
}