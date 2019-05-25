import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../models/document';
import { DataService } from './data.service';

@Injectable()
class DocumentService {
    constructor(
        private apiConnector: DataService,
    ) { }

    list(user_id: number, room_id: string): Observable<Document[]> {
        return this.apiConnector.requestAPI('get', `/document/${user_id}/${room_id}`);
    }

    create(document: Document) {
        return this.apiConnector.requestAPI('post', '/document', document);
    }
}

export { DocumentService, Document }