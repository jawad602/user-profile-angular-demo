import { Subject, throwError as observableThrowError, of } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, tap, catchError, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiServices {
    timeoutValue = 10000;
    constructor(
        private http: HttpClient,
    ) { }

    loadUsers() {
        return this.http.get('https://647b7aa0d2e5b6101db15a08.mockapi.io/api/v1/user-profile-demo')
            .pipe(
                timeout(this.timeoutValue),
                catchError(error => {
                    return throwError(error);
                })
            )
    }
    loadSingleUser(id: any) {
        return this.http.get('https://647b7aa0d2e5b6101db15a08.mockapi.io/api/v1/user-profile-demo/' + id)
            .pipe(
                timeout(this.timeoutValue),
                catchError(error => {
                    return throwError(error);
                })
            )
    }

    addUser(data: any) {
        return this.http.post('https://647b7aa0d2e5b6101db15a08.mockapi.io/api/v1/user-profile-demo', data)
            .pipe(
                timeout(this.timeoutValue),
                catchError(error => {
                    return throwError(error);
                })
            )
    }

    updateUser(data: any, id: any) {
        return this.http.put('https://647b7aa0d2e5b6101db15a08.mockapi.io/api/v1/user-profile-demo/' + id, data)
            .pipe(
                timeout(this.timeoutValue),
                catchError(error => {
                    return throwError(error);
                })
            )
    }

    deleteUser(id: any) {
        return this.http.delete('https://647b7aa0d2e5b6101db15a08.mockapi.io/api/v1/user-profile-demo/' + id)
            .pipe(
                timeout(this.timeoutValue),
                catchError(error => {
                    return throwError(error);
                })
            )
    }
}