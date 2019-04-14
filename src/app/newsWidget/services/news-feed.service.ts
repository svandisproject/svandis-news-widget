import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class NewsFeedService {

    private readonly URL = 'apiUrl';

    constructor(private httpClient: HttpClient) {
    }


    // TODO: Remove mocks and add types
    public getAll(): Observable<any[]> {
        return of([
            {id: 1, title: 'test-1'},
            {id: 2, title: 'test-2'},
            {id: 3, title: 'test-3'},
        ]);
    }
}
