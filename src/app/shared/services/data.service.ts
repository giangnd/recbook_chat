import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class DataService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private router: Router,
    ) { }

    requestAPI(method: string, uri: string, data: Object = null): Observable<any> {
        uri = environment.API_PATH + uri;
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.tokenService.getToken());
        method = method.toLowerCase();
        if (method === 'delete') {
            headers.delete('Transfer-Encoding');
        }
        const options = ({ headers: headers });
        if (method === 'get' || method === 'delete') {
            if (data) {
                uri += '?';
                for (var key in data) {
                    if (data[key])
                        uri += `${key}=${data[key]}&`;
                }
                uri = uri.slice(0, -1);
            }
            data = null;
        } else if (!data) {
            data = {};
        }
        const request: Observable<any> = !data ? this.http[method](uri, options) : this.http[method](uri, data, options);
        return request.pipe(
            tap(res => this.completeRequest(res, 'extractData')),
            catchError(err => this.completeRequest(err, 'handleError'))
        );
    }

    private completeRequest(res, callback) {
        return this[callback](res);
    }

    private extractData(res: any) {
        return res || {};
    }

    private handleError(err: any) {
        if (err.status == 401 || err.statusText === 'Unauthorized') {
            this.reLogin();
        }
        let errMsg: string;
        errMsg = err.error.message && err.error.message ? err.error.message : err.message;
        return throwError(errMsg);
    }

    reLogin() {
        this.tokenService.logOut();
        this.router.navigateByUrl('/auth/login');
    }
}