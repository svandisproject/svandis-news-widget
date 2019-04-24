import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {News} from '../dataModels/News';
import {map} from 'rxjs/operators';
@Injectable()
export class NewsFeedService {
    private page = 0;
    private readonly PER_PAGE = 10;
    private readonly URL = SvandisNewsApiConfig.API_HOST + '/news';

    constructor(private httpClient: HttpClient) {
    }

    private objectToQs(obj: object) {
        if (!obj) {
            return '';
        }
        const res = [];
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            res.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return res.join('&');
    }

    private getRequestUrl(url: string, parameters: object) {
        return `${url}?${this.objectToQs(parameters)}`;
    }

    public getAll(token): Observable<News[]> {
        if (!token) {
            return of([]);
        }
        const parameters = {
            page: ++this.page,
            perPage: this.PER_PAGE
        };
        return this.httpClient.get(this.getRequestUrl(this.URL + '/' + token, parameters))
            .pipe(map( (res: {data: News[]}) => res.data) );
    }
}
