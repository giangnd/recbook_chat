import * as io from 'socket.io-client';
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';

export class SocketService {
    private url = environment.SOCKET_PATH;
    private socket: any;

    constructor() {
        this.socket = io(this.url);
    }

    send = (name: string, message?: any): Observable<any> => {
        this.socket.binary(true).emit(name, message);
        return of(null);
    }

    get = (name: string) => {
        return Observable.create((observer: any) => {
            this.socket.on(name, (message: any) => {
                observer.next(message);
            });
        });
    }
}