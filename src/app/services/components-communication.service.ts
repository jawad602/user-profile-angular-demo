import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ComponentsCommunicationService {
    pageRoute = new Subject();
    userName = new Subject();
    filterUser = new Subject();
    constructor(){
        this.pageRoute.next('All Users');
        this.userName.next('');
        this.filterUser.next('');
    }
 }