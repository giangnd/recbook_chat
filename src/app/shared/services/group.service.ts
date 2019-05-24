import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { DataService } from './data.service';

@Injectable()
class GroupService {
    group: Group;
    constructor(
        private apiConnector: DataService,
    ) { }

    list(user_id: number): Observable<Group[]> {
        return this.apiConnector.requestAPI('get', `/group/${user_id}`);
    }

    create(data: Group) {
        return this.apiConnector.requestAPI('post', '/group', data);
    }

    update(id: string, data: Group): Observable<any> {
        return this.apiConnector.requestAPI('patch', `/group/${id}`, data)
    }
}

export { GroupService, Group }